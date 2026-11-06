"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { routes } from "@/config/navigation";
import { setUnauthorizedHandler } from "@/shared/api/base-api";
import { useSessionQuery } from "@/entities/session/session.queries";
import { SESSION_QUERY_KEY } from "@/entities/session/session.types";

const AUTH_PATHS: readonly string[] = [routes.login, routes.register];

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    useSessionQuery();

    useEffect(() => {
        setUnauthorizedHandler(() => {
            queryClient.setQueryData(SESSION_QUERY_KEY, null);
            if (!AUTH_PATHS.includes(pathname)) router.replace(routes.login);
        });

        return () => setUnauthorizedHandler(null);
    }, [queryClient, router, pathname]);

    return <>{children}</>;
};
