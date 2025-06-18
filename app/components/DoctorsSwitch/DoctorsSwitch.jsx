'use client'
import Styles from "./DoctorsSwitch.module.css"
import clsx from "clsx";

const doctorCategory = [
  "Ортодонты",
  "Гигиенисты",
  "Терапевты",
  "Ортопеды",
  "Хирурги",
  "Микроскописты"
];

export const DoctorsSwitch = ({ active, onChange }) => {
  return (
    <div className={Styles["doctors-nav"]}>
      {doctorCategory.map((category) => (
        <div
          key={category}
          className={clsx(
            Styles["doctor-spec"],
            { [Styles.active]: active === category }
          )}
          onClick={() => onChange(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};