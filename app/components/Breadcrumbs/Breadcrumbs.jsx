'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Styles from "./Breadcrumbs.module.css";
import Link from 'next/link';

export const Breadcrumbs = ({ doctor, service }) => {
  const rawPathname = usePathname();
  const pathname = typeof rawPathname === 'string' ? rawPathname : '';

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

  const pathSegments = Array.isArray(pathname.split('/')) 
    ? pathname.split('/').filter(Boolean) 
    : [];

  const breadcrumbs = useMemo(() => {
    try {
      return pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        let name = segmentTranslations[segment];

        if (!name && doctor && segment === doctor.slug) {
          name = doctor.name;
        }

        if (!name && service && segment === service.slug) {
          name = service.text;
        }

        if (!name) {
          name = decodeURIComponent(segment).replace(/-/g, ' ');
        }

        return {
          name,
          href,
          isLast: index === pathSegments.length - 1,
        };
      });
    } catch (error) {
      console.warn("Breadcrumbs generation error:", error);
      return [];
    }
  }, [pathname, doctor, service]);

  // breadcrumbs гарантированно массив
  return (
    <nav aria-label="breadcrumb">
      <ul className={Styles["doctors-breadcrumbs"]}>
        <li>
          <Link href="/" className={Styles["doctors-breadcrumbs-item"]}>Главная</Link>
        </li>
        {breadcrumbs.map(({ name, href, isLast }) => (
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
