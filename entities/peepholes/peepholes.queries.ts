import { useQuery } from "@tanstack/react-query";
import { getPeephole, getPeepholes } from "./peepholes.api";
import { PEEPHOLES_QUERY_KEY } from "./peepholes.types";

export function useGetPeepholes() {
    return useQuery({
        queryKey: [...PEEPHOLES_QUERY_KEY, "list"],
        queryFn: getPeepholes,
        staleTime: 1000 * 60,
    });
}

export function useGetPeephole(id: number) {
    return useQuery({
        queryKey: [...PEEPHOLES_QUERY_KEY, "detail", id],
        queryFn: () => getPeephole(id),
        enabled: !!id,
    });
}
