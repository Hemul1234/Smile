'use client';

import Styles from "./Modal.module.css";

import { useModal } from "@/app/context/ModalContext";
import { LoginForm } from "../Auth/LoginForm";
import { RegisterForm } from "../Auth/RegisterForm";

export default function AuthModal() {
  const { modal, closeModal, openModal } = useModal();
  if (modal !== "login" && modal !== "register") return null;

  return (
    <div className={Styles.overlay} onClick={closeModal}>
      <div className={Styles.modal} onClick={e => e.stopPropagation()}>
        {modal === "login" ? (
          <>
            <div className={Styles["title"]}>
              <h2 className={Styles["title-text"]}>Авторизация</h2>
              <svg className={Styles["close-icon"]} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                  <path d="M46.8335 46.832L3.8335 3.83203M46.8335 3.83203L3.8335 46.832" stroke-width="6" stroke-linecap="round"/>
              </svg>
            </div>
            <LoginForm />
            <div className={Styles["redirect-group"]}>
              <p className={Styles.label}>Нет аккаунта?</p>
              <button className={Styles.button} onClick={() => openModal("register")}>Зарегистрироваться</button>
            </div>
          </>
        ) : (
          <>
            <div className={Styles["title"]}>
              <h2 className={Styles["title-text"]}>Регистрация</h2>
              <svg className={Styles["close-icon"]} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                  <path d="M46.8335 46.832L3.8335 3.83203M46.8335 3.83203L3.8335 46.832" stroke-width="6" stroke-linecap="round"/>
              </svg>
            </div>
            <RegisterForm />
            <div className={Styles["redirect-group"]}>
              <p className={Styles.label}>Уже есть аккаунт?</p>
              <button className={Styles.button} onClick={() => openModal("login")}>Войти</button>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
}