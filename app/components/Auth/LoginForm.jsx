import Styles from './Form.module.css';

import { useState } from "react";
import { useAuth } from "@/app/api/api-hooks";

export const LoginForm = () => {
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
        Введите ваш email или номер телефона
        <input className={Styles["input"]} type="text" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
      </label>
      <label className={Styles["label"]}>
        Введите ваш пароль
        <input className={Styles["input"]} type="password" required placeholder="Пароль" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}/>
      </label>
      <button className={Styles["button"]} type="submit">Войти</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  ) 
};
