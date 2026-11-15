import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBolt, deleteBolt, updateBolt } from "./bolts.api";
import { BOLTS_QUERY_KEY, BoltCreate } from "./bolts.types";

export function useCreateBolt() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: BoltCreate) => createBolt(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: BOLTS_QUERY_KEY }),
    });
}

export function useUpdateBolt() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: BoltCreate }) => updateBolt(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: BOLTS_QUERY_KEY }),
    });
}

export function useDeleteBolt() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteBolt(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: BOLTS_QUERY_KEY }),
    });
}
