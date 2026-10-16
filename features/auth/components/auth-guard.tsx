"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { useSession } from "@/entities/session/session.queries";
import { Loader } from "@/shared/components/loader";

/** Пускает только авторизованных: анонимного уводит на вход, unknown — ждём гидрацию. */
export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "anonymous") router.replace(routes.login);
    }, [status, router]);

    if (status !== "authenticated") return <Loader fullscreen />;

    return <>{children}</>;
};

/** Обёртка страниц входа/регистрации: авторизованного уводит на главную. */
export const RedirectIfAuthenticated = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") router.replace(routes.home);
    }, [status, router]);

    if (status !== "anonymous") return <Loader fullscreen />;

    return <>{children}</>;
};
