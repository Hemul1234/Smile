import Styles from './Form.module.css';
import { useState } from "react";
import { useAuth } from "@/app/api/api-hooks";
import { useModal } from "@/app/context/ModalContext"
import { toast, Bounce } from "react-toastify";

// Валидация логина: email или телефон
function validateLogin({ identifier, password }) {
  const errors = {};

  // Проверка email или телефона
  if (!identifier || !identifier.trim()) {
    errors.identifier = "Введите email или номер телефона";
  } else {
    // email
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,5}$/;
    // телефон: +7XXXXXXXXXX или 8XXXXXXXXXX (и только цифры)
    const phonePattern = /^(\+7|8)\d{10}$/;
    if (!emailPattern.test(identifier) && !phonePattern.test(identifier)) {
      errors.identifier = "Введите корректный email или номер телефона";
    }
  }

  // Проверка пароля
  if (!password || password.length < 6) {
    errors.password = "Пароль минимум 6 символов";
  }

  return errors;
}

// Приводим телефон к формату +7XXXXXXXXXX
function normalizeIdentifier(identifier) {
  const phonePattern = /^8\d{10}$/;
  if (phonePattern.test(identifier)) {
    return '+7' + identifier.slice(1);
  }
  return identifier;
}

export const LoginForm = () => {
  const { closeModal } = useModal();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState({});
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const localErrors = validateLogin(form);
    if (Object.keys(localErrors).length > 0) {
      setError(localErrors);
      return;
    }
    // Если телефон, приводим к +7...
    const normalized = {
      ...form,
      identifier: normalizeIdentifier(form.identifier)
    };
    const res = await login(normalized);
    if (res?.error || res?.message) {
      setError({ global: res.error || res.message });
      return;
    }
    toast.success("Вход выполнен успешно!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: "colored"
    });
    setForm({ identifier: "", password: "" });
    closeModal();
  };

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit}>
      <label className={Styles["label"]}>
        Введите ваш email или номер телефона
        <input
          className={Styles["input"]}
          type="text"
          required
          value={form.identifier}
          onChange={e => setForm(f => ({...f, identifier: e.target.value}))}
        />
        {error.identifier && <div style={{color: "red"}}>{error.identifier}</div>}
      </label>
      <label className={Styles["label"]}>
        Введите ваш пароль
        <input
          className={Styles["input"]}
          type="password"
          required
          placeholder="Пароль"
          value={form.password}
          onChange={e => setForm(f => ({...f, password: e.target.value}))}
        />
        {error.password && <div style={{color: "red"}}>{error.password}</div>}
      </label>
      <button className={Styles["button"]} type="submit">Войти</button>
      {error.global && <div style={{color: "red"}}>{error.global}</div>}
    </form>
  );
};