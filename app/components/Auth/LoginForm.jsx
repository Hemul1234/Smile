'use client';

import Styles from './Form.module.css';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext"; // ← Исправлено!
import { useModal } from "@/app/context/ModalContext";
import { toast, Bounce } from "react-toastify";

// --- Валидация логина ---
function validateLogin({ identifier, password }) {
  const errors = {};
  const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,5}$/;
  const phonePattern = /^(\+7|8)\d{10}$/;

  if (!identifier || !identifier.trim()) {
    errors.identifier = "Введите email или номер телефона";
  } else if (!emailPattern.test(identifier) && !phonePattern.test(identifier)) {
    errors.identifier = "Введите корректный email или номер телефона";
  }

  if (!password || password.length < 6) {
    errors.password = "Пароль минимум 6 символов";
  }

  return errors;
}

// --- Приведение телефона к +7XXXXXXXXXX ---
function normalizeIdentifier(identifier) {
  return /^8\d{10}$/.test(identifier)
    ? '+7' + identifier.slice(1)
    : identifier;
}

export const LoginForm = () => {
  const { closeModal } = useModal();
  const { login } = useAuth();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    const localErrors = validateLogin(form);
    if (Object.keys(localErrors).length > 0) {
      setError(localErrors);
      setLoading(false);
      return;
    }

    const normalized = {
      ...form,
      identifier: normalizeIdentifier(form.identifier),
    };

    const res = await login(normalized);

    if (res.error) {
      setError({ global: res.message || "Ошибка авторизации" });
      setLoading(false);
      return;
    }

    toast.success("Вход выполнен успешно!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      transition: Bounce,
      theme: "colored"
    });

    setForm({ identifier: "", password: "" });
    closeModal();
    setLoading(false);
  };

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit} noValidate>
      <label className={Styles["label"]}>
        Введите ваш email или номер телефона
        <input
          className={Styles["input"]}
          type="text"
          value={form.identifier}
          onChange={e => setForm(f => ({ ...f, identifier: e.target.value }))}
        />
        {error.identifier && <div style={{ color: "red" }}>{error.identifier}</div>}
      </label>

      <label className={Styles["label"]}>
        Введите ваш пароль
        <input
          className={Styles["input"]}
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        {error.password && <div style={{ color: "red" }}>{error.password}</div>}
      </label>

      {error.global && <div style={{ color: "red", marginBottom: "10px" }}>{error.global}</div>}

      <button className={Styles["button"]} type="submit" disabled={loading}>
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
};
