import Styles from './Form.module.css';
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useModal } from "@/app/context/ModalContext";

export const RegisterForm = () => {
  const { closeModal } = useModal();
  // Расширяем форму под все нужные поля
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const { register, login } = useAuth(); // получаем глобальные методы

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Регистрируем пользователя (добавляем в БД)
    const res = await register(form);
    if (res.error) {
    if (res.error.includes("409")) {
      setError("Пользователь с таким email уже зарегистрирован.");
    } else {
      setError(res.error);
    }
    return;
  }
    // 2. Если регистрация успешна, сразу выполняем вход
    // Если register сразу возвращает токен и пользователя, login можно не вызывать!
    // Если нет — после регистрации выполни login
    if (!res.token) {
      const loginRes = await login({ email: form.email, password: form.password });
      if (loginRes.error) setError(loginRes.error);
    }
    // Можно закрыть модалку, редиректить и т.д.
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
      </label>
      <label className={Styles["label"]}>
        Введите ваш номер телефона
        <input
          className={Styles["input"]}
          type="tel"
          required
          placeholder="+7123456789"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
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
      </label>
      <div className={Styles["checkbox-appoint"]}>
        <input id="checkbox-personal-data-in-modal" className={Styles["checkbox-check"]} type="checkbox" name="check" value="small" required />
        <label htmlFor="checkbox-personal-data-in-modal" className={Styles["checkbox-label"]}>
          Нажимая на кнопку, я даю согласие на обработку <a>персональных данных</a>
        </label>
      </div>
      <button className={Styles["button"]} type="submit">Зарегистрироваться</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};