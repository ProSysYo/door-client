import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLock, deleteLock, updateLock } from "./locks.api";
import { LOCKS_QUERY_KEY, LockCreate } from "./locks.types";

export function useCreateLock() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: LockCreate) => createLock(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: LOCKS_QUERY_KEY }),
    });
}

export function useUpdateLock() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: LockCreate }) => updateLock(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: LOCKS_QUERY_KEY }),
    });
}

export function useDeleteLock() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteLock(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: LOCKS_QUERY_KEY }),
    });
}
