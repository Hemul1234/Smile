import Styles from "./OnlineCalculation.module.css"

export const SymptomsFragment = ({items}) => {
    return (
        <>
            <p className={Styles["symptoms-name"]}>Выберите симптомы</p>
            <ul className={Styles["symptoms-list"]}>
                {items.map((item) => {
                    return (
                        <li className={Styles["simptoms-item"]} key={item.id}>
                            <input id={item.id} className={Styles["symptoms-check"]} type="checkbox" name="check" value="small"/>
                            <label htmlFor={item.id} className={Styles["symptoms-label"]}>
                                {item.symptom}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}