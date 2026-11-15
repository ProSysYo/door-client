import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOutsideFinish, deleteOutsideFinish, updateOutsideFinish } from "./outside-finishes.api";
import { OUTSIDE_FINISHES_QUERY_KEY, OutsideFinishCreate } from "./outside-finishes.types";

export function useCreateOutsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OutsideFinishCreate) => createOutsideFinish(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: OUTSIDE_FINISHES_QUERY_KEY }),
    });
}

export function useUpdateOutsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: OutsideFinishCreate }) => updateOutsideFinish(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: OUTSIDE_FINISHES_QUERY_KEY }),
    });
}

export function useDeleteOutsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteOutsideFinish(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: OUTSIDE_FINISHES_QUERY_KEY }),
    });
}
