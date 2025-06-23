import Styles from './Form.module.css';

import { useState } from "react";

export const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.error) setError(res.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
      <input type="password" required placeholder="Пароль" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}/>
      <button type="submit">Войти</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  ) 
};
