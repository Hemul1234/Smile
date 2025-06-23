import useSWR from "swr";
import {
  getMe,
  getContactInfo, upsertContactInfo, deleteContactInfo,
  getAllAppointments, getAppointmentById, getBlockedTimes, createAppointment, updateAppointment, deleteAppointment,
  getAllDoctors, getDoctorById, getDoctorBySlug, createDoctor, updateDoctor, deleteDoctor,
  getAllServices, getServiceById, getServicesByCategory, getServiceBySlug, getServiceByCategoryAndSlug,
  createService, updateService, deleteService,
  getAllSymptoms, getSymptomById, getSymptomBySlug, getSymptomsByCategory, getSymptomsByService,
  createSymptom, updateSymptom, deleteSymptom,
  getAllVacancies, getVacancyById, createVacancy, updateVacancy, deleteVacancy,
  getAllReviews, getReviewById, createReview, updateReview, deleteReview,
  register, login, refreshToken, logout,
  setJWT, getJWT, removeJWT,
} from "./api-utils0";

// --- AUTH HOOKS ---
export const useAuth = () => {
  // login, register, logout, jwt management
  return {
    login: async (data) => {
      const res = await login(data);
      if (res.token) setJWT(res.token);
      return res;
    },
    register: async (data) => {
      const res = await register(data);
      if (res.token) setJWT(res.token);
      return res;
    },
    logout: () => {
      removeJWT();
      logout(getJWT());
    },
    getJWT,
    setJWT,
    removeJWT
  };
};

// --- USER ---
export const useMe = () => useSWR("me", getMe);

// --- CONTACT INFO ---
export const useContactInfo = () => useSWR("contactInfo", getContactInfo);
export const useUpsertContactInfo = () => upsertContactInfo;
export const useDeleteContactInfo = () => deleteContactInfo;

// --- APPOINTMENTS ---
export const useAppointments = () => useSWR("appointments", getAllAppointments);
export const useAppointment = (id) =>
  useSWR(id ? ["appointment", id] : null, () => getAppointmentById(id));
export const useBlockedTimes = () => useSWR("appointments/blocked", getBlockedTimes);
export const useCreateAppointment = () => createAppointment;
export const useUpdateAppointment = () => updateAppointment;
export const useDeleteAppointment = () => deleteAppointment;

// --- DOCTORS ---
export const useDoctors = () => useSWR("doctors", getAllDoctors);
export const useDoctor = (id) =>
  useSWR(id ? ["doctor", id] : null, () => getDoctorById(id));
export const useDoctorBySlug = (slug) =>
  useSWR(slug ? ["doctorSlug", slug] : null, () => getDoctorBySlug(slug));
export const useCreateDoctor = () => createDoctor;
export const useUpdateDoctor = () => updateDoctor;
export const useDeleteDoctor = () => deleteDoctor;

// --- SERVICES ---
export const useServices = () => useSWR("services", getAllServices);
export const useService = (id) =>
  useSWR(id ? ["service", id] : null, () => getServiceById(id));
export const useServicesByCategory = (category) =>
  useSWR(category ? ["servicesCategory", category] : null, () => getServicesByCategory(category));
export const useServiceBySlug = (slug) =>
  useSWR(slug ? ["serviceSlug", slug] : null, () => getServiceBySlug(slug));
export const useServiceByCategoryAndSlug = (category, slug) =>
  useSWR(category && slug ? ["serviceCatSlug", category, slug] : null, () =>
    getServiceByCategoryAndSlug(category, slug)
  );
export const useCreateService = () => createService;
export const useUpdateService = () => updateService;
export const useDeleteService = () => deleteService;

// --- SYMPTOMS ---
export const useSymptoms = () => useSWR("symptoms", getAllSymptoms);
export const useSymptom = (id) =>
  useSWR(id ? ["symptom", id] : null, () => getSymptomById(id));
export const useSymptomBySlug = (slug) =>
  useSWR(slug ? ["symptomSlug", slug] : null, () => getSymptomBySlug(slug));
export const useSymptomsByCategory = (category) =>
  useSWR(category ? ["symptomsCategory", category] : null, () => getSymptomsByCategory(category));
export const useSymptomsByService = (slugService) =>
  useSWR(slugService ? ["symptomsByService", slugService] : null, () => getSymptomsByService(slugService));
export const useCreateSymptom = () => createSymptom;
export const useUpdateSymptom = () => updateSymptom;
export const useDeleteSymptom = () => deleteSymptom;

// --- VACANCIES ---
export const useVacancies = () => useSWR("vacancies", getAllVacancies);
export const useVacancy = (id) =>
  useSWR(id ? ["vacancy", id] : null, () => getVacancyById(id));
export const useCreateVacancy = () => createVacancy;
export const useUpdateVacancy = () => updateVacancy;
export const useDeleteVacancy = () => deleteVacancy;

// --- REVIEWS ---
export const useReviews = () => useSWR("reviews", getAllReviews);
export const useReview = (id) =>
  useSWR(id ? ["review", id] : null, () => getReviewById(id));
export const useCreateReview = () => createReview;
export const useUpdateReview = () => updateReview;
export const useDeleteReview = () => deleteReview;
