import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrder, deleteOrder, updateOrder } from "./orders.api";
import { ORDERS_QUERY_KEY, OrderCreate } from "./orders.types";

export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OrderCreate) => createOrder(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
    });
}

export function useUpdateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: OrderCreate }) => updateOrder(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
    });
}
