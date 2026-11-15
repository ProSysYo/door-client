import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createModel, deleteModel, updateModel } from "./models.api";
import { MODELS_QUERY_KEY, ModelCreate } from "./models.types";

export function useCreateModel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ModelCreate) => createModel(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEY }),
    });
}

export function useUpdateModel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ModelCreate }) => updateModel(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEY }),
    });
}

export function useDeleteModel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteModel(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEY }),
    });
}
