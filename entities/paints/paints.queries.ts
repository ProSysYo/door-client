import { useQuery } from "@tanstack/react-query";
import { getPaint, getPaints } from "./paints.api";
import { PAINTS_QUERY_KEY } from "./paints.types";


export function useGetPaints() {
    return useQuery({
        queryKey: [...PAINTS_QUERY_KEY, "list"],
        queryFn: getPaints,
        staleTime: 1000 * 60,
    });
}

export function useGetPaint(id: number) {
    return useQuery({
        queryKey: [...PAINTS_QUERY_KEY, "detail", id],
        queryFn: () => getPaint(id),
        enabled: !!id,
    });
}
