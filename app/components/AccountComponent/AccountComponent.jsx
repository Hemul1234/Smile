import Styles from './AccountComponent.module.css';

import { Photo } from "./Photo/Photo";

export const AccountComponent = () => {
  return (
    <div className={Styles["account"]}>
        <Photo />
        <div className={Styles["account-info"]}>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>ФИО:</h3>
                <p className={Styles["text"]}>{doctor.education}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Номер телефона:</h3>
                <p className={Styles["text"]}>{doctor.education}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Дата регистрации</h3>
                <p className={Styles["text"]}>{doctor.education}</p>
            </div>
            <div className={Styles["info-item"]}>
                <h3 className={Styles["name"]}>Email</h3>
                <p className={Styles["text"]}>{doctor.education}</p>
            </div>
        </div>
    </div>
  ) 
};
