import Styles from './Form.module.css';

import { useState } from "react";
import { useAuth } from "@/app/api/api-hooks";

export const RegisterForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.error) setError(res.error);
  };

  return (
    <form className={Styles["form"]} onSubmit={handleSubmit}>
      <label className={Styles["label"]}>
        Введите ваши ФИО
        <input className={Styles["input"]} type="email" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
      </label>
      <label className={Styles["label"]}>
        Введите ваш номер телефона
        <input className={Styles["input"]} type="tel" required placeholder="+7123456789" value={form.tel} onChange={e => setForm(f => ({...f, tel: e.target.value}))}/>
      </label>
      <label className={Styles["label"]}>
        Введите ваш номер email
        <input className={Styles["input"]} type="email" required placeholder="example@mail.ru" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
      </label>
      <label className={Styles["label"]}>
        Введите ваш пароль
        <input className={Styles["input"]} type="password" required placeholder="Пароль" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}/>
      </label>
      <div className={Styles["checkbox-appoint"]}>
          <input id="checkbox-personal-data-in-modal" className={Styles["checkbox-check"]} type="checkbox" name="check" value="small" required/>
          <label htmlFor="checkbox-personal-data-in-modal" className={Styles["checkbox-label"]}>
              Нажимая на кнопку, я даю согласие на обработку <a>персональных данных</a>
          </label>
      </div>
      <button className={Styles["button"]} type="submit">Зарегистрироваться</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  ) 
};
