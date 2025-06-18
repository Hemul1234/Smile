import Styles from "./OnlineCalculation.module.css"

export const OnlineCalculation = ({children}) => {
    return (
        <>
            <div className={Styles.symptoms}>
                {children}
            </div>
            <div className={Styles["cost"]}>
                <p className={Styles["cost-line"]}>Стоимость процедуры: <span className={Styles["cost-calc"]}>от 3000₽</span></p>
                <div className={Styles["buttons-group"]}>
                    <button className={Styles["symptoms-btn"]}>Рассчитать</button>
                    <button className={Styles["symptoms-btn"]}>Записаться</button>
                </div>
            </div>
        </>
    )
}