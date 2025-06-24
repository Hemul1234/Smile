'use client';

import { useModal } from "@/app/context/ModalContext";
import Styles from "./FirstBlock.module.css"

export const FirstBlockClient = () => {
  const { openModal } = useModal();

  return (
    <button className={Styles["home-sign-up"]} onClick={() => openModal("booking")}>Записаться</button>
  );
};
