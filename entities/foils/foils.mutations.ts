import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFoil, deleteFoil, updateFoil } from "./foils.api";
import { FOILS_QUERY_KEY, FoilCreate } from "./foils.types";

export function useCreateFoil() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FoilCreate) => createFoil(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: FOILS_QUERY_KEY }),
    });
}

export function useUpdateFoil() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: FoilCreate }) => updateFoil(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: FOILS_QUERY_KEY }),
    });
}

export function useDeleteFoil() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteFoil(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: FOILS_QUERY_KEY }),
    });
}
