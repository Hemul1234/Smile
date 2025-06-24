"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getJWT, setJWT, removeJWT,
  getMe, login as loginAPI, register as registerAPI
} from "../api/api-utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Логин
  const login = useCallback(async (form) => {
    const res = await loginAPI(form);

    if (res.error) return res; // Не сохраняем токен, если ошибка

    if (res.token) {
      setJWT(res.token);
      setIsAuth(true);
      setUser(res.user || null);
    }

    return res;
  }, []);

  // Регистрация
  const register = useCallback(async (form) => {
    const res = await registerAPI(form);

    if (res.error) return res;

    if (res.token) {
      setJWT(res.token);
      setIsAuth(true);
      setUser(res.user || null);
    }

    return res;
  }, []);

  // Логаут
  const logout = useCallback(() => {
    removeJWT();
    setIsAuth(false);
    setUser(null);
  }, []);

  // Проверка токена и загрузка пользователя при старте
  const checkAuth = useCallback(async () => {
    const token = getJWT();
    if (!token) return;

    const me = await getMe(token);
    if (me && !me.error) {
      setIsAuth(true);
      setUser(me);
    } else {
      logout();
    }
  }, [logout]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
