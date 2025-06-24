import Style from "./Section.module.css"

export function Section ({align, display, title, children, style}) {
    return (
        <section style={style} className={Style.services}>
            <h2 style={{ display: display, textAlign: align }} className={Style.title}>{title}</h2>
            {children}
        </section>
    );
}