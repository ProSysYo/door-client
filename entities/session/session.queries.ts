import { useQuery } from "@tanstack/react-query";
import { baseApi } from "@/shared/api/base-api";
import { SessionApi } from "./session.api";
import { sessionKeys } from "./session.keys";
import type { SessionState } from "./session.types";

const sessionApi = new SessionApi(baseApi);

export const getSessionQueryOptions = () => ({
    queryKey: sessionKeys.current(),
    queryFn: () => sessionApi.getSession(),
    // 401 — штатный ответ для гостя, повторять бессмысленно.
    retry: false,
    // Сессия меняется только после sign-in/sign-out, которые сами обновляют кэш.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
});

export function useSessionQuery() {
    return useQuery(getSessionQueryOptions());
}

/**
 * Выделяет из кэша react-query понятное состояние: user + статус.
 * При загрузке приложения это один запрос GET /auth/session.
 */
export function useSession(): SessionState {
    const { data, isPending, isError } = useSessionQuery();

    if (isPending) return { user: null, status: "unknown" };
    if (isError || !data) return { user: null, status: "anonymous" };

    return { user: data, status: "authenticated" };
}
