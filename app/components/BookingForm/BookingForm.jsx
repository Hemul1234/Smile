"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Calendar } from "@/app/components/BookingForm/Calendar";
import { TimeSelect } from "@/app/components/BookingForm/TimeSelect";
import { Select } from "@/app/components/BookingForm/Select";
import Styles from "./BookingForm.module.css";
import { createAppointment } from "@/app/api/api-utils";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModal } from "@/app/context/ModalContext";
import { getBlockedTimes } from "@/app/api/api-utils";


// 🔍 Валидация и нормализация телефона
const validateBooking = ({ name, tel, date, time, doctor, service, doctors, services, personalData }) => {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = "ФИО обязательно";
  }

  let cleanPhone = tel.replace(/\D/g, "");
  if (cleanPhone.startsWith("8") && cleanPhone.length === 11) {
    cleanPhone = "7" + cleanPhone.slice(1);
  }
  if (!/^7\d{10}$/.test(cleanPhone)) {
    errors.tel = "Телефон должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX";
  }
  const formattedPhone = "+7" + cleanPhone.slice(-10);

  if (!date) errors.date = "Дата обязательна";
  if (!time) errors.time = "Время обязательно";
  if (doctors.length > 0 && !doctor) errors.doctor = "Выберите специалиста";
  if (services.length > 0 && !service) errors.service = "Выберите услугу";
  if (!personalData) errors.personalData = "Необходимо согласие на обработку данных";

  return { errors, formattedPhone };
};

export function BookingForm({ services = [], doctors = [] }) {
  const { closeModal } = useModal();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [callback, setCallback] = useState(false);
  const [personalData, setPersonalData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    const { errors, formattedPhone } = validateBooking({
      name,
      tel,
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
      service: selectedService,
      doctors,
      services,
      personalData
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }

    const payload = {
      fullName: name.trim(),
      phone: formattedPhone,
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor?.id || null,
      service: selectedService?.id || selectedService?.text || selectedService?.name || null,
      callMe: callback,
      personalDataConsent: personalData
    };

    const response = await createAppointment(payload);

    if (response.error || response.message) {
      setError({ global: response.message || response.error });
      setLoading(false);
      return;
    }

    toast.success("Запись успешно создана!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: "colored"
    });

    closeModal();
    setLoading(false);

    // reset
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedDoctor(null);
    setSelectedService(null);
    setName("");
    setTel("");
    setCallback(false);
    setPersonalData(false);
  };
  

  console.log(getBlockedTimes())

  return (
    <form className={Styles["make-an-appointment"]} onSubmit={handleSubmit}>
      <div className={Styles["calendar-wrapper"]}>
        <Calendar onSelect={setSelectedDate} selected={selectedDate} /> 
        {error.date && <div style={{ color: "red", marginTop: "0.5rem" }}>{error.date}</div>}
      </div>
      <div className={Styles["inputs"]}>
        <div className={`${Styles["input-group"]} ${Styles["input-group1"]}`}>
          <label className={Styles.label}>
            Выберите время
            <div className={Styles["select-wrapper"]}>
              <TimeSelect
                blocked={[]}
                onSelect={setSelectedTime}
                selected={selectedTime}
              />
            </div>
            {error.time && <div style={{ color: "red" }}>{error.time}</div>}
          </label>

          {doctors.length > 0 && (
            <label className={Styles.label}>
              Выберите специалиста
              <div className={Styles["select-wrapper"]}>
                <Select
                  options={doctors}
                  placeholder="Выберите специалиста"
                  onSelect={setSelectedDoctor}
                  selected={selectedDoctor}
                />
              </div>
              {error.doctor && <div style={{ color: "red" }}>{error.doctor}</div>}
            </label>
          )}

          {services.length > 0 && (
            <label className={Styles.label}>
              Выберите услугу
              <div className={Styles["select-wrapper"]}>
                <Select
                  options={services}
                  placeholder="Выберите услугу"
                  onSelect={setSelectedService}
                  selected={selectedService}
                />
              </div>
              {error.service && <div style={{ color: "red" }}>{error.service}</div>}
            </label>
          )}
        </div>

        <div className={Styles["input-group"]}>
          <label className={Styles.label} htmlFor="name">
            Введите ваше ФИО
            <input
              className={Styles["input"]}
              type="text"
              name="name"
              id="name"
              placeholder="Иван Иванов Иванович"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {error.name && <div style={{ color: "red" }}>{error.name}</div>}
          </label>

          <label className={Styles.label} htmlFor="tel">
            Введите номер телефона
            <input
              className={Styles["input"]}
              type="tel"
              name="tel"
              id="tel"
              placeholder="+7(999) 999-99-99"
              value={tel}
              onChange={e => setTel(e.target.value)}
            />
            {error.tel && <div style={{ color: "red" }}>{error.tel}</div>}
          </label>
        </div>

        <div className={Styles["checkbox-group"]}>
          <div className={Styles["checkbox-appoint"]}>
            <input
              id="checkbox-call"
              className={Styles["checkbox-check"]}
              type="checkbox"
              name="callback"
              checked={callback}
              onChange={e => setCallback(e.target.checked)}
            />
            <label htmlFor="checkbox-call" className={Styles["checkbox-label"]}>
              Перезвонить мне
            </label>
          </div>
          <div className={Styles["checkbox-appoint"]}>
            <input
              id="checkbox-personal-data"
              className={Styles["checkbox-check"]}
              type="checkbox"
              name="personalData"
              checked={personalData}
              onChange={e => setPersonalData(e.target.checked)}
              required
            />
            <label htmlFor="checkbox-personal-data" className={Styles["checkbox-label"]}>
              Нажимая на кнопку, я даю согласие на обработку{" "}
              <a href="/policy" target="_blank" rel="noopener noreferrer">персональных данных</a>
            </label>
            {error.personalData && <div style={{ color: "red" }}>{error.personalData}</div>}
          </div>
        </div>

        {error.global && <div className={Styles.error}>{error.global}</div>}

        <button className={Styles["sign-up-button"]} type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Записаться на приём"}
        </button>
      </div>
    </form>
  );
}
