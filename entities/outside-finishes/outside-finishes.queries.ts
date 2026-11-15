import { useQuery } from "@tanstack/react-query";
import { getOutsideFinish, getOutsideFinishes } from "./outside-finishes.api";
import { OUTSIDE_FINISHES_QUERY_KEY } from "./outside-finishes.types";

export function useGetOutsideFinishes() {
    return useQuery({
        queryKey: [...OUTSIDE_FINISHES_QUERY_KEY, "list"],
        queryFn: getOutsideFinishes,
        staleTime: 1000 * 60,
    });
}

export function useGetOutsideFinish(id: number) {
    return useQuery({
        queryKey: [...OUTSIDE_FINISHES_QUERY_KEY, "detail", id],
        queryFn: () => getOutsideFinish(id),
        enabled: !!id,
    });
}
