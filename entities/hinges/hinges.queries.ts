import { useQuery } from "@tanstack/react-query";
import { getHinge, getHinges } from "./hinges.api";
import { HINGES_QUERY_KEY } from "./hinges.types";

export function useGetHinges() {
    return useQuery({
        queryKey: [...HINGES_QUERY_KEY, "list"],
        queryFn: getHinges,
        staleTime: 1000 * 60,
    });
}

export function useGetHinge(id: number) {
    return useQuery({
        queryKey: [...HINGES_QUERY_KEY, "detail", id],
        queryFn: () => getHinge(id),
        enabled: !!id,
    });
}
