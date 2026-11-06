import { useQuery } from "@tanstack/react-query";
import { getKnobs, getKnob } from "./knobs.api";
import { KNOBS_QUERY_KEY } from "./knobs.types";

export function useGetKnobs() {
    return useQuery({
        queryKey: [...KNOBS_QUERY_KEY, "list"],
        queryFn: getKnobs,
        staleTime: 1000 * 60,
    });
}

export function useGetKnob(id: number) {
    return useQuery({
        queryKey: [...KNOBS_QUERY_KEY, "detail", id],
        queryFn: () => getKnob(id),
        enabled: !!id,
    });
}
