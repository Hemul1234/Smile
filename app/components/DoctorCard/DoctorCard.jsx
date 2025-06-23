import Styles from "./DoctorCard.module.css"

const API_URL = process.env.NEXT_PUBLIC_API_URL_IMG || 'http://localhost:5000'

export const DoctorCard = ({doctor}) => {
  return (
    <div className={Styles["doctor"]}>
        <div className={Styles["doctor-photo"]}>
            <img className={Styles["photo"]} src={`${API_URL}${doctor.photo}`} alt="photo" />
        </div>
        <div className={Styles["doctor-information"]}>
            <div className={Styles["doctor-info"]}>
                <h3 className={Styles["name"]}>{doctor.name}</h3>
                <p className={Styles["text"]}>{doctor.specialization}</p>
            </div>
            <div className={Styles["doctor-info"]}>
                <h3 className={Styles["name"]}>Образование</h3>
                <p className={Styles["text"]}>{doctor.education}</p>
            </div>
            <div className={Styles["doctor-info"]}>
                <h3 className={Styles["name"]}>Повышение квалификции</h3>
                {Array.isArray(doctor.advanced) && doctor.advanced.length > 0 ? (
                <ul className={Styles["text"]}>
                    {doctor.advanced.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
                ) : (
                <p className={Styles["text"]}>Нет данных</p>
                )}
            </div>
            <div className={Styles["doctor-info"]}>
                <h3 className={Styles["name"]}>Опыт работы</h3>
                <p className={Styles["text"]}>{doctor.experience}</p>
            </div>
            <div className={Styles["buttons"]}>
                <button className={Styles["button"]} href={`tel:${doctor.phone}`}>Записаться на прием</button>
                <button className={Styles["button"]} >Оставить отзыв</button>
            </div>
        </div>
    </div>
  )
};