import { useQuery } from "@tanstack/react-query";
import { getPackaging, getPackagings } from "./packagings.api";
import { PACKAGINGS_QUERY_KEY } from "./packagings.types";

export function useGetPackagings() {
    return useQuery({
        queryKey: [...PACKAGINGS_QUERY_KEY, "list"],
        queryFn: getPackagings,
        staleTime: 1000 * 60,
    })
}

export function useGetPackaging(id: number) {
    return useQuery({
        queryKey: [...PACKAGINGS_QUERY_KEY, "detail", id],
        queryFn: () => getPackaging(id),
        enabled: !!id,
    });
}