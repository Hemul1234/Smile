import Styles from './LoginButton.module.css';

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export const LoginOrAccountButton = ({ openModal }) => {
  const { isAuth } = useAuth();

  return isAuth ? (
    <Link
      href="/account"
      className={Styles["button-login"]}
      style={{ textDecoration: "none" }}
    >
      Личный кабинет
    </Link>
  ) : (
    <button
      className={Styles["button-login"]}
      onClick={() => openModal("login")}
      type="button"
    >
      Войти
    </button>
  );
};