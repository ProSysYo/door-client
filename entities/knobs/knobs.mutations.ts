import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KnobsApi } from "./knobs.api";
import { knobsKeys } from "./knobs.keys";
import { KnobCreate } from "./knobs.types";
import { baseApi } from "@/shared/api/base-api";

const knobsApi = new KnobsApi(baseApi);

export function useCreateKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: KnobCreate) => knobsApi.createKnob(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: knobsKeys.all }),
    });
}

export function useUpdateKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: KnobCreate }) => knobsApi.updateKnob(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: knobsKeys.all }),
    });
}

export function useDeleteKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => knobsApi.deleteKnob(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: knobsKeys.all }),
    });
}
