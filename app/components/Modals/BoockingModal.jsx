'use client';

import Styles from "./Modal.module.css";

import { useModal } from "../../context/ModalContext";
import { BookingForm } from "../BookingForm/BookingForm";

export default function BookingModal() {
  const { modal, closeModal } = useModal();
  if (modal !== "booking") return null;

  return (
    <div className={Styles.overlay} onClick={closeModal}>
      <div className={Styles.modal} onClick={e => e.stopPropagation()}>
        <BookingForm />
        <button className={Styles.closeBtn} onClick={closeModal}>×</button>
      </div>
    </div>
  );
}