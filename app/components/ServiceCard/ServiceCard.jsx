import Styles from "./ServiceCard.module.css"

export function ServiceCard({ data }) {
    const { title, content, cost } = data;
    return (
    <div className={Styles["service-card"]}>
        <div className={Styles.content}>
            {title && <h3 className={Styles["content-title"]}>{title}</h3>}
            {content && content.length > 0 && (
                <ol className={Styles["content-items"]}>
                {content.map((section, idx) => (
                    <li key={idx} className={Styles["content-item"]}>{section.heading}</li>
                ))}
                </ol>
            )}
        </div>
        <div className={Styles.info}>
            {content && content.length > 0 && content.map((section, idx) => (
            <div key={idx} className={`${Styles["info-section"]} ${idx === 0 ? Styles["blue-bg"] : ''}`}>
                {section.heading && <h3 className={Styles["info-title"]}>{section.heading}</h3>}
                {section.text && section.text
                .split(/(?<=[.!?])\s+/)
                .filter(Boolean)
                .map((sentence, idx) => (
                    <p key={idx} className={Styles["info-text"]}>{sentence}</p>
                ))}
                {section.list && section.list.length > 0 && (
                    <ul className={Styles["info-items"]}>
                        {section.list.map((item, i) => (
                        <li key={i} className={Styles["info-item"]}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
            ))}
        </div>
        {cost && <h3 className={Styles["service-cost"]}>Стоимость услуги: <span className={Styles["cost"]}>{cost}₽</span></h3>}
        </div>
    );
}