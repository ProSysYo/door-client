import { useQuery } from "@tanstack/react-query";
import { getJambHole, getJambHoles } from "./jamb-holes.api";
import { JAMB_HOLES_QUERY_KEY } from "./jamb-holes.types";

export function useGetJambHoles() {
    return useQuery({
        queryKey: [...JAMB_HOLES_QUERY_KEY, "list"],
        queryFn: getJambHoles,
        staleTime: 1000 * 60,
    });
}

export function useGetJambHole(id: number) {
    return useQuery({
        queryKey: [...JAMB_HOLES_QUERY_KEY, "detail", id],
        queryFn: () => getJambHole(id),
        enabled: !!id,
    });
}
