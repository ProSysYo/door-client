import { useQuery } from "@tanstack/react-query";
import { getSession } from "./session.api";
import type { SessionState } from "./session.types";

export const getSessionQueryOptions = () => ({
    queryKey: ["session", "current"],
    queryFn: getSession,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
});

export function useSessionQuery() {
    return useQuery(getSessionQueryOptions());
}

export function useSession(): SessionState {
    const { data, isPending, isError } = useSessionQuery();

    if (isPending) return { user: null, status: "unknown" };
    if (isError || !data) return { user: null, status: "anonymous" };

    return { user: data, status: "authenticated" };
}
