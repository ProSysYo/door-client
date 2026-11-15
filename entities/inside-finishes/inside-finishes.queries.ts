import { useQuery } from "@tanstack/react-query";
import { getInsideFinish, getInsideFinishes } from "./inside-finishes.api";
import { INSIDE_FINISHES_QUERY_KEY } from "./inside-finishes.types";

export function useGetInsideFinishes() {
    return useQuery({
        queryKey: [...INSIDE_FINISHES_QUERY_KEY, "list"],
        queryFn: getInsideFinishes,
        staleTime: 1000 * 60,
    });
}

export function useGetInsideFinish(id: number) {
    return useQuery({
        queryKey: [...INSIDE_FINISHES_QUERY_KEY, "detail", id],
        queryFn: () => getInsideFinish(id),
        enabled: !!id,
    });
}
