import Styles from "./SignUpBunnerComponent.module.css";

export const SignUpBunner = () => {
    return (
        <div className={Styles["sign-up-bunner"]}>
            <div className={Styles["sign-up-info"]}>
                <p className={Styles["sign-up-name"]}>
                    Запишитесь на прием в нашу клинику
                </p>
                <p className={Styles["sign-up-text"]}>
                    Оставьте свои контактные данные и наш администратор свяжется с вами для подтверждения. Мы готовы позаботиться о вашем здоровье и комфорте.
                </p>
            </div>
            <form id="sign-up-form" action="" method="get" className={Styles["sign-up-form"]}>
                <input className={Styles["input-sign-up-form"]} type="text" name="text" placeholder="Ваше имя"/>
                <input className={Styles["input-sign-up-form"]} type="tel" name="tel" placeholder="Номер телефона"/>
                <button className={Styles["input-sign-up-form-btn"]}>Записаться на прием</button>
                <p className={Styles["sign-up-form-text"]}>
                    Заполняя форму, вы даете согласие на обработку ваших 
                    <a className={Styles["personal-data"]} id="personal-data" href="#">
                        персональных данных.
                    </a>
                </p>
            </form>
        </div>
    );
}