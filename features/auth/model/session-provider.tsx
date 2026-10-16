"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { routes } from "@/config/navigation";
import { setUnauthorizedHandler } from "@/shared/api/base-api";
import { sessionKeys } from "@/entities/session/session.keys";
import { useSessionQuery } from "@/entities/session/session.queries";

const AUTH_PATHS: readonly string[] = [routes.login, routes.register];

/**
 * Держит сессию приложения: запускает гидрацию (один GET /auth/session)
 * и регистрирует глобальную реакцию на 401 от любого запроса.
 */
export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    useSessionQuery();

    useEffect(() => {
        setUnauthorizedHandler(() => {
            queryClient.setQueryData(sessionKeys.current(), null);
            if (!AUTH_PATHS.includes(pathname)) router.replace(routes.login);
        });

        return () => setUnauthorizedHandler(null);
    }, [queryClient, router, pathname]);

    return <>{children}</>;
};
