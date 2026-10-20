import axios, { isAxiosError } from "axios";
import { env } from "@/config/env";

/**
 * Единый формат ответа сервера.
 */
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    /** Ошибки валидации по полям: { email: ["email must be an email"] } */
    errors: Record<string, string[]> | null;
}

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
    (response) => {
        // Сервер оборачивает всё в ApiResponse — достаём поле data.
        const apiResponse = response.data as ApiResponse<unknown>;
        response.data = apiResponse.data;
        return response;
    },
    (error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            unauthorizedHandler?.();
        }
        return Promise.reject(error);
    },
);
