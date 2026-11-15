import { useQuery } from "@tanstack/react-query";
import { getEar, getEars } from "./ears.api";
import { EARS_QUERY_KEY } from "./ears.types";

export function useGetEars() {
    return useQuery({
        queryKey: [...EARS_QUERY_KEY, "list"],
        queryFn: getEars,
        staleTime: 1000 * 60,
    });
}

export function useGetEar(id: number) {
    return useQuery({
        queryKey: [...EARS_QUERY_KEY, "detail", id],
        queryFn: () => getEar(id),
        enabled: !!id,
    });
}
