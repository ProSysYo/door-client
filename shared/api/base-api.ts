import axios, { isAxiosError } from "axios";
import { env } from "@/shared/config/env";

/**
 * Единый HTTP-клиент приложения.
 * Сессия живёт в httpOnly-куке access-token, поэтому каждый запрос обязан
 * уходить с credentials — иначе бэкенд не увидит токен и ответит 401.
 */
export const baseApi = axios.create({
    baseURL: env.API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

/**
 * Регистрирует реакцию приложения на 401 (сброс сессии + редирект на вход).
 * Обработчик живёт здесь, чтобы слой API не зависел от роутера и стейта.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
    unauthorizedHandler = handler;
}

// Любой 401 означает, что сессия умерла, — глобально её чистит обработчик.
baseApi.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            unauthorizedHandler?.();
        }
        return Promise.reject(error);
    },
);
