import Link from "next/link";
import Styles from "./Card.module.css"
import { getDoctorImage } from "@/app/api/api-utils";

export function Card ({variant, slug, category, name, photo, specialization, cost, text, isFirst}) {
    if (variant === "services") {
        return (
            <li className={Styles["services-item"]}>
                <div className={Styles["services-item-title"]}>
                    <div className={Styles["services-icon"]}>
                        <img src="/images/icons/tooth-services.svg" alt="services-icon" className={Styles["services-icon-inner"]}/>
                    </div>
                    <h3 className={Styles["services-item-name"]}>{name}<br/><span className={Styles["services-item-cost"]}>{cost}₽</span></h3>
                </div>
                <p className={Styles["services-item-text"]}>
                    {text}
                </p>
                <Link className={Styles["sign-up"]} href={`/services/${category}/${slug}`}>Подробнее</Link>
            </li>
        );
    }
    if (variant === "doctors") {
        return (
            <li className={Styles["doctors-list-item"]} style={{ background: `#E1E7FF url(${getDoctorImage(photo)}) no-repeat 120% 110% / auto 84%` }}>
                <div className={Styles["doctors-list-item-text"]}>
                    <p className={Styles["doc-name"]}>
                        {name}
                    </p>
                    <p className={Styles["doc-position"]}>
                        {specialization}
                    </p>
                </div>
                <Link className={Styles["sign-up"]} href={`/doctors/${slug}`}>Подробней</Link>
            </li>
        );
    }
    if (variant ==="doctorsDesktop") {
        return (
            <li className={Styles["doctors-desktop-card"]}>
                <div className={Styles["doctors-desktop-card-text"]}>
                    <p className={`${Styles["doctors-desktop-card-name"]} ${isFirst ? Styles["doctors-desktop-card-name-first"] : ''}`}>{name}</p>
                    <p className={`${Styles["doctors-desktop-card-position"]} ${isFirst ? Styles["doctors-desktop-card-position-first"] : ''}`}>{specialization}</p>
                </div>
                <Link className={`button ${Styles["more-details"]} ${isFirst ? Styles["more-details-first"] : ''}`} href={`/doctors/${slug}`}>Подробнее</Link>
                <img className={`${Styles["women-doc"]} ${isFirst ? Styles["women-doc-first"] : ''}`} src={getDoctorImage(photo) || "/images/women-doc.png"} alt="women-doc"/>
            </li>
        );
    }
}