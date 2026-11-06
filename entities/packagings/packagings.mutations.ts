import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PackagingCreate, PACKAGINGS_QUERY_KEY } from "./packagings.types";
import { createPackaging, deletePackaging, updatePackaging } from "./packagings.api";

export function useCreatePackaging() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PackagingCreate) => createPackaging(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PACKAGINGS_QUERY_KEY }),
    });
}

export function useUpdatePackaging() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: PackagingCreate }) => updatePackaging(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PACKAGINGS_QUERY_KEY }),
    });
}

export function useDeletePackaging() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePackaging(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: PACKAGINGS_QUERY_KEY }),
    });
}
