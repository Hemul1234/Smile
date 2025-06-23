import Styles from './Form.module.css';



export const RegisterForm = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}/>
      <input type="password" required placeholder="Пароль" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}/>
      <button type="submit">Зарегистрироваться</button>
      {error && <div style={{color: "red"}}>{error}</div>}
    </form>
  ) 
};
