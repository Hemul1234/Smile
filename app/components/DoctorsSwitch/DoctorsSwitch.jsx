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
  // Защита от неправильного типа doctorCategory
  const safeCategories = Array.isArray(doctorCategory) ? doctorCategory : [];

  return (
    <div className={Styles["doctors-nav"]}>
      {safeCategories.map((category) => (
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
