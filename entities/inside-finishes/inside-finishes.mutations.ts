import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInsideFinish, deleteInsideFinish, updateInsideFinish } from "./inside-finishes.api";
import { INSIDE_FINISHES_QUERY_KEY, InsideFinishCreate } from "./inside-finishes.types";

export function useCreateInsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: InsideFinishCreate) => createInsideFinish(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INSIDE_FINISHES_QUERY_KEY }),
    });
}

export function useUpdateInsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: InsideFinishCreate }) => updateInsideFinish(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INSIDE_FINISHES_QUERY_KEY }),
    });
}

export function useDeleteInsideFinish() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteInsideFinish(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: INSIDE_FINISHES_QUERY_KEY }),
    });
}
