import { useQuery } from "@tanstack/react-query";
import { getCustomer, getCustomers } from "./customers.api";
import { CUSTOMERS_QUERY_KEY } from "./customers.types";

export function useGetCustomers() {
    return useQuery({
        queryKey: [...CUSTOMERS_QUERY_KEY, "list"],
        queryFn: getCustomers,
        staleTime: 1000 * 60,
    });
}

export function useGetCustomer(id: number) {
    return useQuery({
        queryKey: [...CUSTOMERS_QUERY_KEY, "detail", id],
        queryFn: () => getCustomer(id),
        enabled: !!id,
    });
}
