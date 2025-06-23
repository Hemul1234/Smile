import Styles from './Form.module.css';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useModal } from "@/app/context/ModalContext";
import { toast, Bounce } from "react-toastify";

// Функция для полной валидации и нормализации телефона
function validateRegistration(form) {
  const errors = {};

  // ФИО: не пустое
  if (!form.fullName || !form.fullName.trim()) {
    errors.fullName = "Имя обязательно";
  }

  // Телефон: разрешить 8XXXXXXXXXX или +7XXXXXXXXXX, привести к +7XXXXXXXXXX
  let cleanPhone = form.phone.replace(/\D/g, ""); // только цифры
  if (cleanPhone.startsWith("8") && cleanPhone.length === 11) {
    cleanPhone = "7" + cleanPhone.slice(1);
  }
  if (cleanPhone.startsWith("7") && cleanPhone.length === 11) {
    // ок
  } else {
    errors.phone = "Телефон некорректный. Пример: +7XXXXXXXXXX или 8XXXXXXXXXX";
  }
  const formattedPhone = "+7" + cleanPhone.slice(-10);

  // Email: валидный
  if (!form.email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    errors.email = "Email некорректный";
  }

  // Пароль: минимум 6 символов
  if (!form.password || form.password.length < 6) {
    errors.password = "Пароль минимум 6 символов";
  }

  return { errors, formattedPhone };
}

export const RegisterForm = () => {
  const { closeModal } = useModal();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  const { register, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    // Клиентская валидация
    const { errors, formattedPhone } = validateRegistration(form);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    // Отправляем уже форматированный телефон
    let res = null;
    try {
      res = await register({ ...form, phone: formattedPhone });
    } catch (err) {
      setError({ global: "Ошибка сети. Попробуйте ещё раз." });
      return;
    }

    if (res && (res.error || res.message)) {
      const msg = res.message || res.error;
      if (msg && (msg.includes("уже существует") || msg.includes("409"))) {
        setError({ global: "Пользователь с таким email или телефоном уже зарегистрирован." });
      } else {
        setError({ global: msg || "Ошибка регистрации." });
      }
      return;
    }

    toast.success("Регистрация прошла успешно!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });
    setForm({ fullName: "", phone: "", email: "", password: "" }); // сбрасываем форму
    closeModal(); // закрываем модалку
  };

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit}>
      <label className={Styles["label"]}>
        Введите ваши ФИО
        <input
          className={Styles["input"]}
          type="text"
          required
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
          required
          placeholder="Любой формат номера"
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
          required
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
          required
          placeholder="Пароль"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        {error.password && <div style={{ color: "red" }}>{error.password}</div>}
      </label>
      <div className={Styles["checkbox-appoint"]}>
        <input id="checkbox-personal-data-in-modal" className={Styles["checkbox-check"]} type="checkbox" name="check" value="small" required />
        <label htmlFor="checkbox-personal-data-in-modal" className={Styles["checkbox-label"]}>
          Нажимая на кнопку, я даю согласие на обработку <a>персональных данных</a>
        </label>
      </div>
      <button className={Styles["button"]} type="submit">Зарегистрироваться</button>
      {error.global && <div style={{ color: "red" }}>{error.global}</div>}
    </form>
  );
};