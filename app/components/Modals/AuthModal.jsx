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
            <LoginForm />
            <p>
              Нет аккаунта?{" "}
              <button onClick={() => openModal("register")}>Зарегистрироваться</button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p>
              Уже есть аккаунт?{" "}
              <button onClick={() => openModal("login")}>Войти</button>
            </p>
          </>
        )}
        <button className={Styles.closeBtn} onClick={closeModal}>×</button>
      </div>
    </div>
  );
}