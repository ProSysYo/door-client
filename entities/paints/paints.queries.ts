import { useQuery } from "@tanstack/react-query";
import { getPaint, getPaints } from "./paints.api";


export function useGetPaints() {
    return useQuery({
        queryKey: ["paints", "list"],
        queryFn: getPaints,
        staleTime: 1000 * 60,
    });
}

export function useGetPaint(id: number) {
    return useQuery({
        queryKey: ["paints", "detail", id],
        queryFn: () => getPaint(id),
        enabled: !!id,
    });
}
