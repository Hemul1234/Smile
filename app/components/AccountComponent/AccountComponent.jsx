'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from './AccountComponent.module.css';
import { Photo } from "./Photo/Photo";
import { useAuth } from "@/app/context/AuthContext";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export const AccountComponent = () => {
  const { user, logout, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  if (!user) return <div>Загрузка...</div>;

  const handleEdit = () => {
    setForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      email: user.email || ""
    });
    setEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCancel = () => {
    setEditMode(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const resp = await res.json().catch(() => ({}));
        throw new Error(resp.error || resp.message || "Ошибка обновления профиля");
      }
      const updatedUser = await res.json();
      updateUser(updatedUser);
      setEditMode(false);
      setSuccess("Данные успешно обновлены!");
    } catch (err) {
      setError(err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={Styles["account"]}>
      <Photo />
      <div className={!editMode ? Styles["account-info-read"] : Styles["account-info"]}>
        {editMode ? (
          <form onSubmit={handleSave} className={Styles["edit-form"]}>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>ФИО:</h3>
              <input
                className={Styles["text"]}
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>Номер телефона:</h3>
              <input
                className={Styles["text"]}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>Email</h3>
              <input
                className={Styles["text"]}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className={Styles["error"]}>{error}</div>}
            {success && <div className={Styles["success"]}>{success}</div>}
            <button className={Styles["button"]} type="submit" disabled={loading}>
              Сохранить
            </button>
            <button className={Styles["button"]} type="button" onClick={handleCancel} disabled={loading}>
              Отмена
            </button>
          </form>
        ) : (
          <>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>ФИО:</h3>
              <p className={Styles["text"]}>{user.fullName}</p>
            </div>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>Номер телефона:</h3>
              <p className={Styles["text"]}>{user.phone}</p>
            </div>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>Дата регистрации</h3>
              <p className={Styles["text"]}>{formatDate(user.createdAt)}</p>
            </div>
            <div className={Styles["info-item"]}>
              <h3 className={Styles["name"]}>Email</h3>
              <p className={Styles["text"]}>{user.email}</p>
            </div>
            {error && <div className={Styles["error"]}>{error}</div>}
            {success && <div className={Styles["success"]}>{success}</div>}
            <button className={Styles["button"]} onClick={handleEdit}>
              Редактировать
            </button>
            <button className={Styles["button"]} onClick={handleLogout}>
              Выйти
            </button>
          </>
        )}
      </div>
    </div>
  );
};