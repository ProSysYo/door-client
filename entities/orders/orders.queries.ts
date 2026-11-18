import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrders } from "./orders.api";
import { ORDERS_QUERY_KEY } from "./orders.types";

export function useGetOrders() {
    return useQuery({
        queryKey: [...ORDERS_QUERY_KEY, "list"],
        queryFn: getOrders,
        staleTime: 1000 * 60,
    });
}

export function useGetOrder(id: number) {
    return useQuery({
        queryKey: [...ORDERS_QUERY_KEY, "detail", id],
        queryFn: () => getOrder(id),
        enabled: !!id,
    });
}
