"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/BookingForm/Calendar";
import { TimeSelect } from "@/app/components/BookingForm/TimeSelect";
import { Select } from "@/app/components/BookingForm/Select";
import Styles from "./BookingForm.module.css";
import { createAppointment } from "@/app/api/api-utils";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function BookingForm({ services = [], doctors = [] }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [callback, setCallback] = useState(false);
  const [personalData, setPersonalData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    const doctorOk = doctors.length === 0 ? true : !!selectedDoctor;
const serviceOk = services.length === 0 ? true : !!selectedService;

    if (
    !selectedDate ||
    !selectedTime ||
    !doctorOk ||
    !serviceOk ||
    !name ||
    !tel ||
    !personalData
    ) {
    setResult({ success: false, message: "Пожалуйста, заполните все обязательные поля." });
    return;
    }

    setLoading(true);

    const data = {
    fullName: name,
    phone: tel,
    date: selectedDate,
    time: selectedTime,
    doctor: selectedDoctor ? selectedDoctor.id : null,
    service: selectedService ? selectedService.id || selectedService.text || selectedService.name : null,
    callMe: callback,
    personalDataConsent: personalData,
  };

    const response = await createAppointment(data);

    if (response.error) {
      setResult({ success: false, message: response.error });
    } else {
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
      setResult({ success: true, message: "Запись успешно создана!" });
      setSelectedDate(null);
      setSelectedTime("");
      setSelectedDoctor(null);
      setSelectedService(null);
      setName("");
      setTel("");
      setCallback(false);
      setPersonalData(false);
    }
    setLoading(false);
  };


  return (
    <form className={Styles["make-an-appointment"]} onSubmit={handleSubmit}>
      <Calendar onSelect={setSelectedDate} selected={selectedDate} />
      <div className={Styles["inputs"]}>
        <div className={Styles["input-group"]}>
          <label className={Styles.label}>
            Выберите время
            <div className={Styles["select-wrapper"]}>
              <TimeSelect
                blocked={['10:00', '12:30', '15:00']}
                onSelect={setSelectedTime}
                selected={selectedTime}
              />
            </div>
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
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className={Styles.label} htmlFor="tel">
            Введите номер телефона
            <input
              className={Styles["input"]}
              type="tel"
              name="tel"
              id="tel"
              placeholder="+7(999) 999-99-99"
              required
              value={tel}
              onChange={e => setTel(e.target.value)}
            />
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
              required
              checked={personalData}
              onChange={e => setPersonalData(e.target.checked)}
            />
            <label htmlFor="checkbox-personal-data" className={Styles["checkbox-label"]}>
              Нажимая на кнопку, я даю согласие на обработку <a href="/policy" target="_blank" rel="noopener noreferrer">персональных данных</a>
            </label>
          </div>
        </div>
        <button className={Styles["sign-up-button"]} type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Записаться на прием"}
        </button>
        {result && !result.success && (
          <div className={Styles.error}>
            {result.message}
          </div>
        )}
      </div>
    </form>
  );
}