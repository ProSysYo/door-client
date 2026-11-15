import { useQuery } from "@tanstack/react-query";
import { getBolt, getBolts } from "./bolts.api";
import { BOLTS_QUERY_KEY } from "./bolts.types";

export function useGetBolts() {
    return useQuery({
        queryKey: [...BOLTS_QUERY_KEY, "list"],
        queryFn: getBolts,
        staleTime: 1000 * 60,
    });
}

export function useGetBolt(id: number) {
    return useQuery({
        queryKey: [...BOLTS_QUERY_KEY, "detail", id],
        queryFn: () => getBolt(id),
        enabled: !!id,
    });
}
