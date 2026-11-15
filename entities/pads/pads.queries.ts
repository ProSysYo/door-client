import { useQuery } from "@tanstack/react-query";
import { getPad, getPads } from "./pads.api";
import { PADS_QUERY_KEY } from "./pads.types";

export function useGetPads() {
    return useQuery({
        queryKey: [...PADS_QUERY_KEY, "list"],
        queryFn: getPads,
        staleTime: 1000 * 60,
    });
}

export function useGetPad(id: number) {
    return useQuery({
        queryKey: [...PADS_QUERY_KEY, "detail", id],
        queryFn: () => getPad(id),
        enabled: !!id,
    });
}
