// Адрес бэкенда (задать через .env: NEXT_PUBLIC_API_URL)
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const endpoints = {
  // --- АВТОРИЗАЦИЯ ---
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  refresh: `${BASE_URL}/auth/refresh`,
  logout: `${BASE_URL}/auth/logout`,

  // --- ПОЛЬЗОВАТЕЛЬ ---
  me: `${BASE_URL}/user/me`,

  // --- КОНТАКТЫ КЛИНИКИ ---
  contactInfo: `${BASE_URL}/contact-info`, // GET (публично), POST, DELETE (только admin)

  // --- ЗАПИСЬ НА ПРИЕМ ---
  appointments: `${BASE_URL}/appointments`, // GET, POST
  appointmentById: (id) => `${BASE_URL}/appointments/${id}`,
  appointmentBlocked: `${BASE_URL}/appointments/blocked`,

  // --- ВРАЧИ ---
  doctors: `${BASE_URL}/doctors`,
  doctorById: (id) => `${BASE_URL}/doctors/${id}`,
  doctorBySlug: (slug) => `${BASE_URL}/doctors/slug/${slug}`,

  // --- УСЛУГИ ---
  services: `${BASE_URL}/services`,
  serviceById: (id) => `${BASE_URL}/services/${id}`,
  servicesByCategory: (category) => `${BASE_URL}/services/category/${category}`,
  serviceBySlug: (slug) => `${BASE_URL}/services/slug/${slug}`,
  serviceByCategoryAndSlug: (category, slug) =>
    `${BASE_URL}/services/category/${category}/slug/${slug}`,

  // --- СИМПТОМЫ ---
  symptoms: `${BASE_URL}/symptoms`,
  symptomById: (id) => `${BASE_URL}/symptoms/${id}`,
  symptomBySlug: (slug) => `${BASE_URL}/symptoms/slug/${slug}`,
  symptomsByCategory: (category) => `${BASE_URL}/symptoms/category/${category}`,
  symptomsByService: (slugService) =>
    `${BASE_URL}/symptoms/service/${slugService}`,

  // --- ВАКАНСИИ ---
  vacancies: `${BASE_URL}/vacancies`,
  vacancyById: (id) => `${BASE_URL}/vacancies/${id}`,

  // --- ОТЗЫВЫ ---
  reviews: `${BASE_URL}/reviews`,
  reviewById: (id) => `${BASE_URL}/reviews/${id}`,
};