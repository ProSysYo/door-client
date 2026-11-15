import { useQuery } from "@tanstack/react-query";
import { getFoil, getFoils } from "./foils.api";
import { FOILS_QUERY_KEY } from "./foils.types";

export function useGetFoils() {
    return useQuery({
        queryKey: [...FOILS_QUERY_KEY, "list"],
        queryFn: getFoils,
        staleTime: 1000 * 60,
    });
}

export function useGetFoil(id: number) {
    return useQuery({
        queryKey: [...FOILS_QUERY_KEY, "detail", id],
        queryFn: () => getFoil(id),
        enabled: !!id,
    });
}
