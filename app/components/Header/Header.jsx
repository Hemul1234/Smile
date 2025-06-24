'use client'

import Styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useToggleActive } from "@/app/hooks/useToggleActive";
import { useMediaQuery } from 'react-responsive';
import { getDataByTypeAndCategory } from "@/app/data/dataUtils";
import { useModal } from "@/app/context/ModalContext";
import { LoginOrAccountButton } from "../LoginButton/LoginButton";

export const Header = () => {
    
    const pathname = usePathname();
    const [burgerActive, setBurgerActive] = useState(false);
    const {active, toggleActive} = useToggleActive();
    const { openModal } = useModal();
    
    const [terapy, surgery, esthetic, prosthetics] = 
        ['terapy', 'surgery', 'esthetic', 'prosthetics']
            .map(category => getDataByTypeAndCategory('services', category));

    const isDesktop = useMediaQuery({ minWidth: 992 });
    useEffect(() => {
        if (isDesktop) {
            setBurgerActive(false);
            toggleActive(null)
        }
    }, [isDesktop])

    useEffect(() => {
        if (burgerActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [burgerActive]);

    useEffect(() => {
        setBurgerActive(false);
        toggleActive(null);
    }, [pathname]);


    return (
        <header className={`${Styles.header} ${burgerActive ? Styles.active : ''}`}>
            <div className={Styles["header-head-cover"]}>
                <div className={`${Styles["header-head"]} ${burgerActive ? Styles.active : ''}`}>
                    <div className={Styles["logo-burger"]}>
                        {pathname === "/" ? <img className={Styles.logo} src="/images/logo.png" alt="logo"/> 
                        :
                        <Link href="/" onClick={() => setIsActive(handleCloseMenu)}>
                            <img className={Styles.logo} src="/images/logo.png" alt="logo"/>
                        </Link>}
                        <svg className={`${Styles.ham} ${Styles.hamRotate} ${Styles.ham4} ${burgerActive ? Styles.active : ''}`} viewBox="0 0 100 100" width="65" onClick={() => setBurgerActive(prev => !prev)}>
                            <path
                                    className={`${Styles.line} ${Styles.top}`}
                                    d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                            <path
                                    className={`${Styles.line} ${Styles.middle}`}
                                    d="m 70,50 h -40" />
                            <path
                                    className={`${Styles.line} ${Styles.bottom}`}
                                    d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                        </svg>
                    </div>
                    <div className={`${Styles["contacts"]} ${burgerActive ? Styles.active : ''}`}>
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
            </div>
            <div className={`${Styles["navbar-bg"]} ${burgerActive ? Styles.active : ''}`}>
                <nav className={`${Styles.navbar} ${burgerActive ? Styles.active : ''}`}>
                    <ul className={Styles["navbar-list"]}>
                        <li className={Styles["navbar-list-item"]}><Link href="/services">Услуги</Link>
                            <svg className={Styles["accordion-button"]} onClick={() => {
                                if (!isDesktop) toggleActive(0);
                                }} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.34901 0.714987C1.27268 0.646313 1.18288 0.592626 1.08476 0.556991C0.986632 0.521355 0.882095 0.504468 0.777115 0.507295C0.672135 0.510123 0.568768 0.532608 0.472916 0.573468C0.377063 0.614328 0.290603 0.672762 0.218471 0.745435C0.146339 0.818107 0.0899475 0.903594 0.052517 0.997015C0.0150866 1.09044 -0.00265024 1.18996 0.000319499 1.28991C0.00328924 1.38985 0.0269072 1.48826 0.069825 1.57952C0.112743 1.67078 0.17412 1.75309 0.250452 1.82177L7.44623 8.29193C7.59468 8.42555 7.79122 8.5 7.99551 8.5C8.1998 8.5 8.39634 8.42555 8.54478 8.29193L15.7414 1.82177C15.8194 1.75355 15.8824 1.67125 15.9267 1.57966C15.971 1.48806 15.9957 1.389 15.9995 1.28822C16.0033 1.18745 15.9859 1.08696 15.9486 0.992605C15.9112 0.898249 15.8545 0.811905 15.7818 0.738586C15.7091 0.665267 15.6218 0.606435 15.525 0.565509C15.4282 0.524582 15.3238 0.502376 15.2179 0.500181C15.112 0.497985 15.0067 0.515843 14.9081 0.552718C14.8095 0.589594 14.7196 0.644751 14.6436 0.714986L7.99551 6.6919L1.34901 0.714987Z"/>
                            </svg>
                            <ul className={`${Styles["navbar-list-subitems"]} ${active === 0 ? Styles.active : ''}`}>
                                <li className={`${Styles["navbar-list-subitem"]} ${Styles["navbar-list-subitem-terapy"]}`}><Link href="/services/terapy">Терапия</Link>
                                    <ul className={Styles["navbar-list-subitem-details"]}>
                                        {(terapy.slice(0, 7) ?? []).map(({text, category, slug}, index) => (
                                            <li className={Styles["navbar-list-subitem-details-item"]} key={index}><Link href={`/services/${category}/${slug}`}>{text}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                                <li className={Styles["navbar-list-subitem"]}><Link href="/services/surgery">Хирургия</Link>
                                    <ul className={Styles["navbar-list-subitem-details"]}>
                                        {(surgery.slice(0, 3) ?? []).map(({text, category, slug}, index) => {
                                            const preview = text.split(" ").slice(0, 3).join(" ");
                                            return (
                                                <li className={Styles["navbar-list-subitem-details-item"]} key={index}><Link href={`/services/${category}/${slug}`}>{preview}</Link></li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className={Styles["navbar-list-subitem"]}><Link href="/services/esthetic">Эстетика</Link>
                                    <ul className={Styles["navbar-list-subitem-details"]}>
                                        {(esthetic.slice(0, 3)?? []).map(({text, category, slug}, index) => {
                                            const preview = text.split(" ").slice(0, 3).join(" ");
                                            return (
                                                <li className={Styles["navbar-list-subitem-details-item"]} key={index}><Link href={`/services/${category}/${slug}`}>{preview}</Link></li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li className={Styles["navbar-list-subitem"]}><Link href="/services/prosthetics">Протезирование зубов</Link>
                                    <ul className={Styles["navbar-list-subitem-details"]}>
                                        {(prosthetics.slice(0, 3)?? []).map(({text, category, slug}, index) => {
                                            const preview = text.split(" ").slice(0, 4).join(" ");
                                            return (
                                                <li className={Styles["navbar-list-subitem-details-item"]} key={index}><Link href={`/services/${category}/${slug}`}>{preview}</Link></li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className={Styles["navbar-list-item"]}>О клинике
                            <svg className={Styles["accordion-button"]} onClick={() => {
                                if (!isDesktop) toggleActive(1);
                                }} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={Styles["accordion-button"]} d="M1.34901 0.714987C1.27268 0.646313 1.18288 0.592626 1.08476 0.556991C0.986632 0.521355 0.882095 0.504468 0.777115 0.507295C0.672135 0.510123 0.568768 0.532608 0.472916 0.573468C0.377063 0.614328 0.290603 0.672762 0.218471 0.745435C0.146339 0.818107 0.0899475 0.903594 0.052517 0.997015C0.0150866 1.09044 -0.00265024 1.18996 0.000319499 1.28991C0.00328924 1.38985 0.0269072 1.48826 0.069825 1.57952C0.112743 1.67078 0.17412 1.75309 0.250452 1.82177L7.44623 8.29193C7.59468 8.42555 7.79122 8.5 7.99551 8.5C8.1998 8.5 8.39634 8.42555 8.54478 8.29193L15.7414 1.82177C15.8194 1.75355 15.8824 1.67125 15.9267 1.57966C15.971 1.48806 15.9957 1.389 15.9995 1.28822C16.0033 1.18745 15.9859 1.08696 15.9486 0.992605C15.9112 0.898249 15.8545 0.811905 15.7818 0.738586C15.7091 0.665267 15.6218 0.606435 15.525 0.565509C15.4282 0.524582 15.3238 0.502376 15.2179 0.500181C15.112 0.497985 15.0067 0.515843 14.9081 0.552718C14.8095 0.589594 14.7196 0.644751 14.6436 0.714986L7.99551 6.6919L1.34901 0.714987Z"/>
                            </svg>
                            <ul style={{ gridTemplateColumns: '100%' }} className={`${Styles["navbar-list-subitems"]} ${active === 1 ? Styles.active : ''}`}>
                                <li style={{ gridColumn: '1 / 2' }} className={Styles["navbar-list-subitem"]}><Link href="/services/terapy">Наши преимущества</Link></li>
                                <li style={{ gridColumn: '1 / 2' }} className={Styles["navbar-list-subitem"]}><Link href="/vacancies">Вакансии</Link></li>
                                <li style={{ gridColumn: '1 / 2' }} className={Styles["navbar-list-subitem"]}><Link href="/legal-information">Юридическая информация</Link></li>
                            </ul>
                        </li>
                        <li className={Styles["navbar-list-item"]}><Link href="/doctors" onClick={() => setIsActive(handleCloseMenu)}>Врачи</Link></li>
                        <li className={Styles["navbar-list-item"]}>Контакты</li>
                    </ul>
                    <div className={Styles["search-group"]}>
                        <LoginOrAccountButton openModal={openModal}/>
                        <input className={Styles.search} type="search" placeholder="поиск"/>
                    </div>
                </nav>
            </div>
        </header>
    )
}