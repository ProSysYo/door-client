import { useQuery } from "@tanstack/react-query";
import { KnobsApi } from "./knobs.api";
import { knobsKeys } from "./knobs.keys";
import { KnobFilters } from "./knobs.types";
import { baseApi } from "@/shared/api/base-api";

const knobsApi = new KnobsApi(baseApi);

export function useGetKnobs(filters?: KnobFilters) {
    return useQuery({
        queryKey: knobsKeys.list(filters ?? {}),
        queryFn: () => knobsApi.getKnobs(filters),
        staleTime: 1000 * 60,
    });
}

export function useGetKnob(id: number) {
    return useQuery({
        queryKey: knobsKeys.detail(id),
        queryFn: () => knobsApi.getKnob(id),
        enabled: !!id,
    });
}
