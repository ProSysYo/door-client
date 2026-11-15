import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createHinge, deleteHinge, updateHinge } from "./hinges.api";
import { HINGES_QUERY_KEY, HingeCreate } from "./hinges.types";

export function useCreateHinge() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: HingeCreate) => createHinge(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: HINGES_QUERY_KEY }),
    });
}

export function useUpdateHinge() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: HingeCreate }) => updateHinge(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: HINGES_QUERY_KEY }),
    });
}

export function useDeleteHinge() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteHinge(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: HINGES_QUERY_KEY }),
    });
}
