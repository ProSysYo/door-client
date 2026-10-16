import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

let browserQueryClient: QueryClient | undefined;

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
                retry: 1,
            },
        },
    });
}

export const getQueryClient = () => {
    if (typeof window === "undefined") {
        return makeQueryClient();
    }
    return (browserQueryClient ??= makeQueryClient());
};

export const useQueryClientState = () => {
    const [queryClient] = useState(() => getQueryClient());
    return queryClient;
};
