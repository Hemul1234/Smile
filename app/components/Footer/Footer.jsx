import Styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={Styles.footer}>
            <div className={Styles["footer-nav"]}>
                <a href="#">
                    <img className={Styles["logo-footer"]} src="/images/logo.png" alt="logo"/>
                </a>
                <div className={Styles["footer-nav-block"]}>
                    <p className={Styles["footer-nav-block-name"]}>
                        Быстрые ссылки
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Услуги
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Врачи
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        О клинике
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Контакты
                    </p>
                </div>
                <div className={Styles["footer-nav-block"]}>
                    <p className={Styles["footer-nav-block-name"]}>
                        Услуги
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Терапия
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Протезирование зубов
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Хирургия
                    </p>
                    <p className={Styles["footer-nav-block-item"]}>
                        Эстетика
                    </p>
                </div>
                <div className={Styles["footer-nav-block"]}>
                    <p className={Styles["footer-nav-block-name"]}>
                        О клинике
                    </p>
                    <p className={Styles["footer-nav-block-item-bottom"]}>
                        Наши преимущества
                    </p>
                    <p className={Styles["footer-nav-block-item-bottom"]}>
                        Вакансии
                    </p>
                    <p className={Styles["footer-nav-block-item-bottom"]}>
                        Юридическая информация
                    </p>
                </div>
                <div className={Styles["contacts"]}>
                    <div className={Styles["contacts-item"]}>
                        <img className={Styles["contacts-item-icon"]} src="/images/icons/tel-icon.svg" alt="tel"/>
                        <p className={Styles["contacts-item-label"]}>
                            Справочная
                        </p>
                        <p className={Styles["contacts-item-information"]}>+7 (999) 999-99-99</p>
                    </div>
                    <div className={Styles["contacts-item"]}>
                        <img className={Styles["contacts-item-icon"]} src="/images/icons/map-icon.svg" alt="map"/>
                        <p className={Styles["contacts-item-label"]}>
                            Адреса филиалов
                        </p>
                        <p className={Styles["contacts-item-information"]}>Ул. Матросова 4</p>
                    </div>
                    <div className={Styles["contacts-item"]}>
                        <img className={Styles["contacts-item-icon"]} src="/images/icons/clock-icon.svg" alt="clock"/>
                        <p className={Styles["contacts-item-label"]}>
                            Режим работы
                        </p>
                        <p className={Styles["contacts-item-information"]}>Пн-Сб: с 10:00 - 22:00</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}