import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPad, deletePad, updatePad } from "./pads.api";
import { PADS_QUERY_KEY, PadCreate } from "./pads.types";

export function useCreatePad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PadCreate) => createPad(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PADS_QUERY_KEY }),
    });
}

export function useUpdatePad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PadCreate }) => updatePad(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PADS_QUERY_KEY }),
    });
}

export function useDeletePad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePad(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PADS_QUERY_KEY }),
    });
}
