import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKnob, updateKnob, deleteKnob } from "./knobs.api";
import { KNOBS_QUERY_KEY, type KnobCreate } from "./knobs.types";

export function useCreateKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: KnobCreate) => createKnob(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: KNOBS_QUERY_KEY }),
    });
}

export function useUpdateKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: KnobCreate }) => updateKnob(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: KNOBS_QUERY_KEY }),
    });
}

export function useDeleteKnob() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteKnob(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: KNOBS_QUERY_KEY }),
    });
}
