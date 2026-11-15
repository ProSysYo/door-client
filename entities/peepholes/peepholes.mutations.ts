import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPeephole, deletePeephole, updatePeephole } from "./peepholes.api";
import { PEEPHOLES_QUERY_KEY, PeepholeCreate } from "./peepholes.types";

export function useCreatePeephole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PeepholeCreate) => createPeephole(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PEEPHOLES_QUERY_KEY }),
    });
}

export function useUpdatePeephole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PeepholeCreate }) => updatePeephole(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PEEPHOLES_QUERY_KEY }),
    });
}

export function useDeletePeephole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePeephole(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PEEPHOLES_QUERY_KEY }),
    });
}
