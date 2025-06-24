import Styles from "./DoctorCard.module.css";
import { DoctorCardClient } from "./DoctorCardClient";
import { getDoctorImage } from "@/app/api/api-utils";

export const DoctorCard = ({ doctor }) => {
  const safeDoctor = doctor || {};
  const {
    name = "Не указано",
    specialization = "Нет специализации",
    education = "Нет информации",
    experience = "Нет информации",
    photo = "",
    advanced = [],
  } = safeDoctor;

  return (
    <div className={Styles["doctor"]}>
      <div className={Styles["doctor-photo"]}>
        <img
          className={Styles["photo"]}
          src={getDoctorImage(photo)}
          alt="photo"
        />
      </div>
      <div className={Styles["doctor-information"]}>
        <div className={Styles["doctor-info"]}>
          <h3 className={Styles["name"]}>{name}</h3>
          <p className={Styles["text"]}>{specialization}</p>
        </div>
        <div className={Styles["doctor-info"]}>
          <h3 className={Styles["name"]}>Образование</h3>
          <p className={Styles["text"]}>{education}</p>
        </div>
        <div className={Styles["doctor-info"]}>
          <h3 className={Styles["name"]}>Повышение квалификации</h3>
          {Array.isArray(advanced) && advanced.length > 0 ? (
            <ul className={Styles["text"]}>
              {advanced.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className={Styles["text"]}>Нет данных</p>
          )}
        </div>
        <div className={Styles["doctor-info"]}>
          <h3 className={Styles["name"]}>Опыт работы</h3>
          <p className={Styles["text"]}>{experience}</p>
        </div>
        <DoctorCardClient />
      </div>
    </div>
  );
};
