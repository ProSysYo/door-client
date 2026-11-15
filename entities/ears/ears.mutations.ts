import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEar, deleteEar, updateEar } from "./ears.api";
import { EARS_QUERY_KEY, EarCreate } from "./ears.types";

export function useCreateEar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EarCreate) => createEar(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EARS_QUERY_KEY }),
    });
}

export function useUpdateEar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EarCreate }) => updateEar(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EARS_QUERY_KEY }),
    });
}

export function useDeleteEar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteEar(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: EARS_QUERY_KEY }),
    });
}
