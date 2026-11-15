import { useQuery } from "@tanstack/react-query";
import { getModel, getModels } from "./models.api";
import { MODELS_QUERY_KEY } from "./models.types";

export function useGetModels() {
    return useQuery({
        queryKey: [...MODELS_QUERY_KEY, "list"],
        queryFn: getModels,
        staleTime: 1000 * 60,
    });
}

export function useGetModel(id: number) {
    return useQuery({
        queryKey: [...MODELS_QUERY_KEY, "detail", id],
        queryFn: () => getModel(id),
        enabled: !!id,
    });
}
