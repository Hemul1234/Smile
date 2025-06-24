'use client';

import { useMediaQuery } from 'react-responsive';
import Link from "next/link";
import Styles from "./DoctorsSlider.module.css";

import { ResponsiveSlider } from '../Slider/ResponsiveSlider';
import { CardList } from '../CardList/CardList';
import { getDoctorImage } from '@/app/api/api-utils';

export default function DoctorsSlider({ doctors }) {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return isDesktop ? (
    <>
      <CardList data={doctors.slice(0, 5)} variant="doctorsDesktop" />
      <Link className={`button ${Styles["button-all-doctors"]}`} href={`/doctors`}>
        Все врачи
      </Link>
    </>
  ) : (
    <ResponsiveSlider
      items={doctors}
      renderItem={(doctor) => (
        <div className={Styles.slide}>
          <div className={Styles["slide-text"]}>
            <p className={Styles["slide-text-name"]}>{doctor.name}</p>
            <p className={Styles["slide-text-position"]}>{doctor.specialization}</p>
            <button className={Styles["more-details"]}>Подробнее</button>
          </div>
          <img
            className={Styles["women-doc"]}
            src={doctor.photo ? getDoctorImage(doctor.photo) : "/images/women-doc.png"}
            alt={doctor.name}
          />
        </div>
      )}
      slidesPerViewDesktop={2}
      slidesPerViewMobile={1}
      gap={16}
    />
  );
}