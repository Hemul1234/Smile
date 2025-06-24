import Styles from "./ServiceCard.module.css"

export function ServiceCard({ service }) {
    if (!service) return null;
    const { cost, text, article } = service;
    const title = article?.title;
    const content = article?.content;

    return (
        <div className={Styles["service-card"]}>
            <div className={Styles.content}>
                {title && <h3 className={Styles["content-title"]}>{title}</h3>}
                {Array.isArray(content) && content.length > 0 && (
                    <ol className={Styles["content-items"]}>
                        {content.map((section, idx) => (
                            <li key={idx} className={Styles["content-item"]}>{section.heading}</li>
                        ))}
                    </ol>
                )}
            </div>
            <div className={Styles.info}>
                {Array.isArray(content) && content.length > 0 && content.map((section, idx) => (
                    <div key={idx} className={`${Styles["info-section"]} ${idx === 0 ? Styles["blue-bg"] : ''}`}>
                        {section.heading && <h3 className={Styles["info-title"]}>{section.heading}</h3>}
                        {typeof section.text === 'string' && section.text
                            .split(/(?<=[.!?])\s+/)
                            .filter(Boolean)
                            .map((sentence, i) => (
                                <p key={i} className={Styles["info-text"]}>{sentence}</p>
                            ))}
                        {Array.isArray(section.list) && section.list.length > 0 && (
                            <ul className={Styles["info-items"]}>
                                {section.list.map((item, i) => (
                                    <li key={i} className={Styles["info-item"]}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            {typeof cost === "number" &&
                <h3 className={Styles["service-cost"]}>
                    Стоимость услуги: <span className={Styles["cost"]}>{cost}₽</span>
                </h3>
            }
        </div>
    );
}