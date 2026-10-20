import { useQuery } from "@tanstack/react-query";
import { getKnobs, getKnob } from "./knobs.api";

export function useGetKnobs() {
    return useQuery({
        queryKey: ["knobs", "list"],
        queryFn: getKnobs,
        staleTime: 1000 * 60,
    });
}

export function useGetKnob(id: number) {
    return useQuery({
        queryKey: ["knobs", "detail", id],
        queryFn: () => getKnob(id),
        enabled: !!id,
    });
}
