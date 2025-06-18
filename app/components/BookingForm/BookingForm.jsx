import { Calendar } from "@/app/components/BookingForm/Calendar";
import { TimeSelect } from "@/app/components/BookingForm/TimeSelect";
import { DoctorsSelect } from "@/app/components/BookingForm/DoctorsSelect";

import Styles from "./BookingForm.module.css"

export function BookingForm({data}) {
    const serviceData = data;
    return(
        <form className={Styles["make-an-appointment"]}>
            <Calendar />
            <div className={Styles["inputs"]}>
                <div className={Styles["input-group"]}>
                <label className={Styles.label}>
                    Выберите время
                    <div className={Styles["select-wrapper"]}>
                    <TimeSelect
                    blocked={['10:00', '12:30', '15:00']}
                    />
                    </div>
                </label>
                <label className={Styles.label}>
                    Выберите специалиста
                    <div className={Styles["select-wrapper"]}>
                    <DoctorsSelect category={serviceData.category}/>
                    </div>
                </label>
                </div>
                <div className={Styles["input-group"]}>
                <label className={Styles.label}>
                    Введите ваше ФИО
                    <input className={Styles["input"]} type="text" name="name" id="name" placeholder="Иван Иванов Иванович" required />
                </label>
                <label className={Styles.label}>
                    Введите номер телефона
                    <input className={Styles["input"]} type="tel" name="tel" id="tel" placeholder="+7(999) 999-99-99" required />
                </label>
                </div>
                <div className={Styles["checkbox-group"]}>
                <div className={Styles["checkbox-appoint"]}>
                    <input id="checkbox-call" className={Styles["checkbox-check"]} type="checkbox" name="check" value="small"/>
                    <label htmlFor="checkbox-call" className={Styles["checkbox-label"]}>
                        Перезвонить мне
                    </label>
                </div>
                <div className={Styles["checkbox-appoint"]}>
                    <input id="checkbox-personal-data" className={Styles["checkbox-check"]} type="checkbox" name="check" value="small" required/>
                    <label htmlFor="checkbox-personal-data" className={Styles["checkbox-label"]}>
                        Нажимая на кнопку, я даю согласие на обработку <a>персональных данных</a>
                    </label>
                </div>
                </div>
                <button className={Styles["sign-up-button"]}>Записаться на прием</button>
            </div>
        </form>
    );
}