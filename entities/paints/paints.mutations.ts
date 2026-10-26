import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPaint, deletePaint, updatePaint } from "./paints.api";
import { PaintCreate } from "./paints.types";

export function useCreatePaint() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PaintCreate) => createPaint(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paints"] }),
    });
}

export function useUpdatePaint() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PaintCreate }) => updatePaint(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paints"] }),
    });
}

export function useDeletePaint() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePaint(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["paints"] }),
    });
}
