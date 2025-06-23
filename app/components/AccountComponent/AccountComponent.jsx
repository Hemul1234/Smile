'use client';

import Styles from './AccountComponent.module.css';

import { Photo } from "./Photo/Photo";
import { useAuth } from "@/app/context/AuthContext";

export const AccountComponent = () => {
    const { user } = useAuth();
    if (!user) {
      return <div>Загрузка...</div>; // или спиннер, или редирект на логин
    }
  return (
    <div className={Styles["account"]}>
        <Photo />
        <div className={Styles["account-info"]}>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>ФИО:</h3>
                <p className={Styles["text"]}>{user.fullName}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Номер телефона:</h3>
                <p className={Styles["text"]}>{user.phone}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Дата регистрации</h3>
                <p className={Styles["text"]}>{user.createdAt}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Email</h3>
                <p className={Styles["text"]}>{user.email}</p>
            </div>
            <button className={Styles["button"]}>Редактировать</button>
            <button className={Styles["button"]}>Выйти</button>
        </div>
    </div>
  ) 
};
