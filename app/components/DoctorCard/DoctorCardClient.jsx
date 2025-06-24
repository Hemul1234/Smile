'use client';

import { useModal } from "@/app/context/ModalContext";
import Styles from "./DoctorCard.module.css";

export const DoctorCardClient = () => {
  const { openModal } = useModal();

  return (
    <div className={Styles["buttons"]}>
      <button
        className={Styles["button"]}
        onClick={() => openModal("booking")}
      >
        Записаться на прием
      </button>
      <button className={Styles["button"]}>
        Оставить отзыв
      </button>
    </div>
  );
};
