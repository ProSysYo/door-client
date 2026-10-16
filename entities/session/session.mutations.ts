import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApi } from "@/shared/api/base-api";
import { isAxiosError } from "axios";
import { SessionApi } from "./session.api";
import { sessionKeys } from "./session.keys";
import type { Credentials } from "./session.types";

const sessionApi = new SessionApi(baseApi);

/**
 * Ответ sign-in пустой, поэтому данные пользователя сразу дотягиваем
 * из единственного источника правды — GET /auth/session.
 */
export function useSignIn() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials: Credentials) => {
            await sessionApi.signIn(credentials);
            return sessionApi.getSession();
        },
        onSuccess: (user) => queryClient.setQueryData(sessionKeys.current(), user),
    });
}

/**
 * Ответ sign-up пустой — аналогично дотягиваем пользователя.
 */
export function useSignUp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials: Credentials) => {
            await sessionApi.signUp(credentials);
            return sessionApi.getSession();
        },
        onSuccess: (user) => queryClient.setQueryData(sessionKeys.current(), user),
    });
}

/**
 * Выход не идемпотентен: 401 означает «уже разлогинен» и считается успехом.
 * onSettled гарантированно сбрасывает кэш сессии, чтобы UI сразу отреагировал.
 */
export function useSignOut() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            try {
                await sessionApi.signOut();
            } catch (error) {
                // 401 — пользователь уже разлогинен, глотаем.
                if (!isAxiosError(error) || error.response?.status !== 401) throw error;
            }
            return null;
        },
        // Любой исход (200, 401, сетевая ошибка) трактуем как «разлогинен».
        onSettled: () => queryClient.setQueryData(sessionKeys.current(), null),
    });
}
