'use client';

import Styles from "./Modal.module.css";
import { useModal } from "@/app/context/ModalContext";
import { BookingForm } from "../BookingForm/BookingForm";
import { useEffect, useState } from "react";
import { getAllDoctors, getAllServices } from "@/app/api/api-utils"; // или свои функции

export default function BookingModal() {
  const { modal, closeModal } = useModal();
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modal === "booking") {
      setLoading(true);
      Promise.all([getAllDoctors(), getAllServices()]).then(([d, s]) => {
        setDoctors(d || []);
        setServices(s || []);
        setLoading(false);
      });
    }
  }, [modal]);

  if (modal !== "booking") return null;

  return (
    <div className={Styles.overlay} onClick={closeModal}>
      <div className={`${Styles.modal} ${Styles.bookingModal}`} onClick={e => e.stopPropagation()}>
        <div className={Styles["title"]}>
          <h2 className={Styles["title-text"]}>Запись на прием</h2>
          <svg className={Styles["close-icon"]} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
              <path d="M46.8335 46.832L3.8335 3.83203M46.8335 3.83203L3.8335 46.832" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </div>
        {loading
          ? <div>Загрузка...</div>
          : <BookingForm services={services} doctors={doctors} />}
      </div>
    </div>
  );
}