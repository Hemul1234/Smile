'use client';

import Styles from './Form.module.css';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useModal } from "@/app/context/ModalContext";
import { toast, Bounce } from "react-toastify";

// --- Валидация и нормализация ---
function validateRegistration(form) {
  const errors = {};
  let phone = form.phone.replace(/\D/g, ""); // только цифры

  if (!form.fullName || !form.fullName.trim()) {
    errors.fullName = "Имя обязательно";
  }

  if (phone.startsWith("8") && phone.length === 11) {
    phone = "7" + phone.slice(1);
  }
  if (!/^7\d{10}$/.test(phone)) {
    errors.phone = "Телефон некорректный. Пример: +7XXXXXXXXXX или 8XXXXXXXXXX";
  }

  if (!form.email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    errors.email = "Email некорректный";
  }

  if (!form.password || form.password.length < 6) {
    errors.password = "Пароль минимум 6 символов";
  }

  const formattedPhone = "+7" + phone.slice(-10);
  return { errors, formattedPhone };
}

export const RegisterForm = () => {
  const { closeModal } = useModal();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    const { errors, formattedPhone } = validateRegistration(form);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }

    const res = await register({ ...form, phone: formattedPhone });

    if (res.error || res.message) {
      const msg = res.message || res.error || "";
      if (msg.includes("уже существует") || msg.includes("409")) {
        setError({ global: "Пользователь с таким email или телефоном уже зарегистрирован." });
      } else {
        setError({ global: msg || "Ошибка регистрации." });
      }
      setLoading(false);
      return;
    }

    toast.success("Регистрация прошла успешно!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce
    });

    setForm({ fullName: "", phone: "", email: "", password: "" });
    closeModal();
    setLoading(false);
  };

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit}>
      <label className={Styles["label"]}>
        Введите ваши ФИО
        <input
          className={Styles["input"]}
          type="text"
          placeholder="ФИО"
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
        />
        {error.fullName && <div style={{ color: "red" }}>{error.fullName}</div>}
      </label>

      <label className={Styles["label"]}>
        Введите ваш номер телефона
        <input
          className={Styles["input"]}
          type="tel"
          placeholder="8XXXXXXXXXX или +7XXXXXXXXXX"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
        {error.phone && <div style={{ color: "red" }}>{error.phone}</div>}
      </label>

      <label className={Styles["label"]}>
        Введите ваш email
        <input
          className={Styles["input"]}
          type="email"
          placeholder="example@mail.ru"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        {error.email && <div style={{ color: "red" }}>{error.email}</div>}
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

      <div className={Styles["checkbox-appoint"]}>
        <input
          id="checkbox-personal-data-in-modal"
          className={Styles["checkbox-check"]}
          type="checkbox"
          name="check"
          required
        />
        <label htmlFor="checkbox-personal-data-in-modal" className={Styles["checkbox-label"]}>
          Нажимая на кнопку, я даю согласие на обработку <a>персональных данных</a>
        </label>
      </div>

      {error.global && <div style={{ color: "red", marginBottom: "10px" }}>{error.global}</div>}

      <button className={Styles["button"]} type="submit" disabled={loading}>
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};