import Styles from "./VacancyCard.module.css"

export const Vacancy = ({data}) => {
    return (
        <>
            {(data ?? []).map((vacancy, index) => (
                <div className={Styles["vacancy"]} key={index}>
                    <h3 className={Styles["vacancy-name"]}>{vacancy.name}</h3>
                    <div className={Styles["vacancy-info"]}>
                        <p className={Styles["vacancy-section-name"]}>Оклад: <span className={Styles["vacancy-salary"]}>от {vacancy.salary} ₽</span></p>
                        <div className={Styles["vacancy-description"]}>
                            <p className={Styles["vacancy-section-name"]}>Описание:</p>
                            <ul className={Styles["vacancy-section-content"]}>
                                {(vacancy.description ?? []).map((item, index) => (
                                    <li className={Styles["vacancy-section-item"]} key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={Styles["vacancy-description"]}>
                            <p className={Styles["vacancy-section-name"]}>Требования:</p>
                            <ul className={Styles["vacancy-section-content"]}>
                                {(vacancy.requirements ?? []).map((item, index) => (
                                    <li className={Styles["vacancy-section-item"]} key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <a className={Styles["vacancy-hh-link"]} href="https://hh.ru/" target="blank">Посмотреть на hh.ru</a>
                    </div>
                </div>
            ))}
        </>
    );
};