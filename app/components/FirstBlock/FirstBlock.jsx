import Styles from "./FirstBlock.module.css"

export const FirstBlock = ({title}) => {
    return (
        <section className={Styles.home}>
            <h1 className={Styles["home-name"]}>{title}<br/><span className={Styles["span-home-name-uppercase"]}>своих зубов уже сегодня!</span></h1>
            <div className={Styles.void}>
                <h3 className={Styles["home-oferta"]}>Получи комплексное лечение<br/><span className={Styles["span-bold"]}>со скидкой 5%</span></h3>
                <div className={Styles["home-dantist"]}>
                    <img className={Styles["home-dantist-img"]} src="/images/home-dantist.png" alt=""/>
                </div>
                <div className={Styles["home-info-group"]}>
                    <button className={Styles["home-sign-up"]}>Записаться</button>
                    <div className={Styles["home-info-item"]}>
                        <p className={Styles["home-info-item-number"]}>5000</p>
                        <p className={Styles["home-info-item-text"]}>довольных<br/>клиентов</p>
                    </div>
                    <div className={Styles["home-info-item"]}>
                        <p className={Styles["home-info-item-number"]}>15</p>
                        <p className={Styles["home-info-item-text"]}>лет<br/>на рынке</p>
                    </div>
                </div>
            </div>
        </section>
    )
}