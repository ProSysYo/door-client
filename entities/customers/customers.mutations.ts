import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomer, deleteCustomer, updateCustomer } from "./customers.api";
import { CUSTOMERS_QUERY_KEY, CustomerCreate } from "./customers.types";

export function useCreateCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CustomerCreate) => createCustomer(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY }),
    });
}

export function useUpdateCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CustomerCreate }) => updateCustomer(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY }),
    });
}

export function useDeleteCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteCustomer(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY }),
    });
}
