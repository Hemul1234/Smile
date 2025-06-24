'use client'
import { useState } from "react";
import Styles from "./OnlineCalculation.module.css"

export const OnlineCalculation = ({children}) => {
    const [cost, setCost] = useState(3000);

    // Генерирует случайное число кратное 100 в диапазоне 1700–4500
    const randomCost = () => {
        const min = 1700;
        const max = 4500;
        // Округляем до сотен
        const rand = Math.floor(Math.random() * ((max - min) / 100 + 1)) * 100 + min;
        setCost(rand);
    };
    return (
        <>
            <div className={Styles.symptoms}>
                {children}
            </div>
            <div className={Styles["cost"]}>
                <p className={Styles["cost-line"]}>Стоимость процедуры: <span className={Styles["cost-calc"]}>от {cost}₽</span></p>
                <div className={Styles["buttons-group"]}>
                    <button onClick={randomCost} className={Styles["symptoms-btn"]}>Рассчитать</button>
                    <button className={Styles["symptoms-btn"]}>Записаться</button>
                </div>
            </div>
        </>
    )
}