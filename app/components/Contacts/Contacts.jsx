import Styles from "./Contacts.module.css"

export const Contacts = () => {
    return (
            <div className={Styles["contacts-card"]}>
                <div className={Styles["map"]}></div>
                <div className={Styles["contacts-data"]}>
                    <div className={Styles.icons}>
                        <div className={Styles.icon}>
                            <img className={Styles.ic} src="/images/icons/clock.png" alt="clock"/>
                            <p className={Styles["ic-text"]}>Пн-Сб: с 10:00 - 23:00</p>
                        </div>
                        <div className={Styles.icon}>
                            <img className={Styles.ic} src="/images/icons/map.png" alt="map"/>
                            <p className={Styles["ic-text"]}>Ул. Матросова д. 4</p>
                        </div>
                        <div className={Styles.icon}>
                            <img className={Styles.ic} src="/images/icons/mail.png" alt="mail"/>
                            <p className={Styles["ic-text"]}>smile@gmail.com</p>
                        </div>
                        <div className={Styles.icon}>
                            <img className={Styles.ic} src="/images/icons/call.png" alt="call"/>
                            <p className={Styles["ic-text"]}>+7 (999) 999-99-99</p>
                        </div>
                    </div>
                    <div className={Styles.details}>
                        <p className={Styles["details-name"]}>
                            Реквизиты
                        </p>
                        <p className={Styles["details-text"]}>
                            ООО Стоматологическая клиника «Улыбка»<br/>
                            ОГРН: 1162468096108 от 06.08.2018 года, выдано Инспекцией Федеральной налоговой службы по Центральному району г. Красноярска.<br/>
                            Лицензия: ЛО-24-01-004098 от 30.08.2018 года<br/>
                            Выдана Министерством здравоохранения Красноярского края
                        </p>
                    </div>
                </div>
            </div>
    )
}