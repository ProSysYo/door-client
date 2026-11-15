import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createJambHole, deleteJambHole, updateJambHole } from "./jamb-holes.api";
import { JAMB_HOLES_QUERY_KEY, JambHoleCreate } from "./jamb-holes.types";

export function useCreateJambHole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: JambHoleCreate) => createJambHole(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: JAMB_HOLES_QUERY_KEY }),
    });
}

export function useUpdateJambHole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: JambHoleCreate }) => updateJambHole(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: JAMB_HOLES_QUERY_KEY }),
    });
}

export function useDeleteJambHole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteJambHole(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: JAMB_HOLES_QUERY_KEY }),
    });
}
