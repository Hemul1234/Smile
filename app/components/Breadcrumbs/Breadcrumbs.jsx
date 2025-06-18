'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Styles from "./Breadcrumbs.module.css";
import { findItemBySlug } from "@/app/data/dataUtils";
import Link from 'next/link';

export const Breadcrumbs = () => {
    const pathname = usePathname();

    const segmentTranslations = {
        'doctors': 'Врачи',
        'microscopist': 'Микроскописты',
        'orthodontist': 'Ортодонты',
        'hygienist': 'Гигиенисты',
        'therapist': 'Терапевты',
        'surgeon': 'Хирурги',
        'services': 'Услуги',
        'contacts': 'Контакты',
        'about': 'О клинике',
        'vacancies': 'Вакансии',
        'legal-information': 'Юридическая информация',
        'terapy': 'Терапия',
        'surgery': 'Хирургия',
        'esthetic': 'Эстетика',
        'prosthetics': 'Протезирование',
        };

    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs = useMemo(() => {
        return pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');

        const translation = segmentTranslations[segment];
        if (translation) {
            return {
            name: translation,
            href,
            isLast: index === pathSegments.length - 1,
            };
        }

        const found = findItemBySlug(segment);
        const name = found ? found.name : decodeURIComponent(segment).replace(/-/g, ' ');

        return {
            name,
            href,
            isLast: index === pathSegments.length - 1,
        };
        });
    }, [pathname]);
    
    return (
        <nav aria-label="breadcrumb">
            <ul className={Styles["doctors-breadcrumbs"]}>
                <li>
                <Link href="/" className={Styles["doctors-breadcrumbs-item"]}>Главная</Link>
                </li>
                {breadcrumbs.map(({ name, href, isLast }, index) => (
                <li key={href} className={Styles["doctors-breadcrumbs-item"]}>
                    <div className={Styles["doctors-breadcrumbs-separator"]}></div>
                    {isLast ? (
                    <span>{name}</span>
                    ) : (
                    <Link href={href}>{name}</Link>
                    )}
                </li>
                ))}
            </ul>
        </nav>
    );
};