import { useQuery } from "@tanstack/react-query";
import { getLock, getLocks } from "./locks.api";
import { LOCKS_QUERY_KEY } from "./locks.types";

export function useGetLocks() {
    return useQuery({
        queryKey: [...LOCKS_QUERY_KEY, "list"],
        queryFn: getLocks,
        staleTime: 1000 * 60,
    });
}

export function useGetLock(id: number) {
    return useQuery({
        queryKey: [...LOCKS_QUERY_KEY, "detail", id],
        queryFn: () => getLock(id),
        enabled: !!id,
    });
}
