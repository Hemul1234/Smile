// Универсальные утилиты для работы с Smile-backend API
import { endpoints } from "./config";
import normalizeDataObject from "./normalize";

// --- Работа с JWT только через localStorage ---
export const setJWT = (jwt) => localStorage.setItem("jwt", jwt);
export const getJWT = () => localStorage.getItem("jwt");
export const removeJWT = () => localStorage.removeItem("jwt");

// Базовые методы HTTP
const getHeaders = (token, isJson = true) => {
  const headers = {};
  if (isJson) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// Вспомогательная функция для обработки ответа
const parseResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    return { error: true, message: 'Невозможно прочитать ответ от сервера' };
  }

  if (!response.ok) {
    return {
      error: true,
      message: data?.message || `Ошибка: ${response.status}`,
    };
  }

  return data;
};

// GET
export const getData = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: getHeaders(token, false),
      credentials: 'include',
    });
    const data = await parseResponse(response);
    if (data.error) return data;
    return normalizeDataObject(data); // если у тебя есть нормализация
  } catch (error) {
    return { error: true, message: 'Ошибка получения данных' };
  }
};

// POST
export const postData = async (url, data, token) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return await parseResponse(response);
  } catch (error) {
    return { error: true, message: 'Ошибка отправки данных' };
  }
};

// PATCH
export const patchData = async (url, data, token) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return await parseResponse(response);
  } catch (error) {
    return { error: true, message: 'Ошибка обновления данных' };
  }
};

// PATCH c ручным заголовком Authorization
export const patchAuthorizedData = async (url, data, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return await parseResponse(response);
  } catch (error) {
    return { error: true, message: 'Ошибка авторизованного PATCH запроса' };
  }
};

// DELETE
export const deleteData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(token, false),
      credentials: 'include',
    });
    return await parseResponse(response);
  } catch (error) {
    return { error: true, message: 'Ошибка удаления данных' };
  }
};

//UPLOAD DATA
export const uploadData = async (url, formData, token) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data?.message || `Ошибка: ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    return {
      error: true,
      message: 'Ошибка загрузки данных',
    };
  }
};


// --- IMAGES ---

export const getDoctorImage = (filename) => `${endpoints.img.doctors}${filename}`;
export const getServiceImage = (filename) => `${endpoints.img.services}${filename}`;
export const getUserImage = (filename) => `${endpoints.img.users}${filename}`;

// --- AUTH ---
export const register = (data) => postData(endpoints.register, data);
export const login = (data) => postData(endpoints.login, data);
export const refreshToken = (data) => postData(endpoints.refresh, data);
export const logout = (token) => postData(endpoints.logout, {}, token);

// --- USER ---
export const getMe = (token = getJWT()) => getData(endpoints.me, token);
export const patchMe = (data, token = getJWT()) => patchAuthorizenData(endpoints.me, data, token);

// --- CONTACT INFO ---
export const getContactInfo = () => getData(endpoints.contactInfo);
export const upsertContactInfo = (data, token = getJWT()) => postData(endpoints.contactInfo, data, token);
export const deleteContactInfo = (token = getJWT()) => deleteData(endpoints.contactInfo, token);

// --- APPOINTMENTS ---
export const getAllAppointments = (token = getJWT()) => getData(endpoints.appointments, token);
export const getAppointmentById = (id, token = getJWT()) => getData(endpoints.appointmentById(id), token);
export const getBlockedTimes = () => getData(endpoints.appointmentBlocked);
export const createAppointment = (data) => postData(endpoints.appointments, data); // публично
export const updateAppointment = (id, data, token = getJWT()) => patchData(endpoints.appointmentById(id), data, token);
export const deleteAppointment = (id, token = getJWT()) => deleteData(endpoints.appointmentById(id), token);

// --- DOCTORS ---
export const getAllDoctors = () => getData(endpoints.doctors);
export const getDoctorById = (id) => getData(endpoints.doctorById(id));
export const getDoctorBySlug = (slug) => getData(endpoints.doctorBySlug(slug));
export const createDoctor = (data, token = getJWT()) => postData(endpoints.doctors, data, token);
export const updateDoctor = (id, data, token = getJWT()) => patchData(endpoints.doctorById(id), data, token);
export const deleteDoctor = (id, token = getJWT()) => deleteData(endpoints.doctorById(id), token);

// --- SERVICES ---
export const getAllServices = () => getData(endpoints.services);
export const getServiceById = (id) => getData(endpoints.serviceById(id));
export const getServicesByCategory = (category) => getData(endpoints.servicesByCategory(category));
export const getServiceBySlug = (slug) => getData(endpoints.serviceBySlug(slug));
export const getServiceByCategoryAndSlug = (category, slug) => getData(endpoints.serviceByCategoryAndSlug(category, slug));
export const createService = (data, token = getJWT()) => postData(endpoints.services, data, token);
export const updateService = (id, data, token = getJWT()) => patchData(endpoints.serviceById(id), data, token);
export const deleteService = (id, token = getJWT()) => deleteData(endpoints.serviceById(id), token);

// --- SYMPTOMS ---
export const getAllSymptoms = () => getData(endpoints.symptoms);
export const getSymptomById = (id) => getData(endpoints.symptomById(id));
export const getSymptomBySlug = (slug) => getData(endpoints.symptomBySlug(slug));
export const getSymptomsByCategory = (category) => getData(endpoints.symptomsByCategory(category));
export const getSymptomsByService = (slugService) => getData(endpoints.symptomsByService(slugService));
export const createSymptom = (data, token = getJWT()) => postData(endpoints.symptoms, data, token);
export const updateSymptom = (id, data, token = getJWT()) => patchData(endpoints.symptomById(id), data, token);
export const deleteSymptom = (id, token = getJWT()) => deleteData(endpoints.symptomById(id), token);

// --- VACANCIES ---
export const getAllVacancies = () => getData(endpoints.vacancies);
export const getVacancyById = (id) => getData(endpoints.vacancyById(id));
export const createVacancy = (data, token = getJWT()) => postData(endpoints.vacancies, data, token);
export const updateVacancy = (id, data, token = getJWT()) => patchData(endpoints.vacancyById(id), data, token);
export const deleteVacancy = (id, token = getJWT()) => deleteData(endpoints.vacancyById(id), token);

// --- REVIEWS ---
export const getAllReviews = () => getData(endpoints.reviews);
export const getReviewById = (id) => getData(endpoints.reviewById(id));
export const createReview = (data, token = getJWT()) => postData(endpoints.reviews, data, token);
export const updateReview = (id, data, token = getJWT()) => patchData(endpoints.reviewById(id), data, token);
export const deleteReview = (id, token = getJWT()) => deleteData(endpoints.reviewById(id), token);

// --- Вспомогательное ---
export const isResponseOk = (response) => !response?.error;

//export async function getServicesByCategory(category) {
  //const url = `${process.env.NEXT_PUBLIC_API_URL}/services/${category}`;
  //const res = await fetch(url, { cache: "no-store" }); // cache: "no-store" чтобы всегда были свежие данные
  //if (!res.ok) throw new Error('Ошибка загрузки услуг');
  //const data = await res.json();
  //return normalizeDataObject(data);
//}

