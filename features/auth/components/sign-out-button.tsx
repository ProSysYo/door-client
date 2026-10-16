"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/navigation";
import { useSignOut } from "@/entities/session/session.mutations";
import { DropdownMenuItem } from "@/shared/components/shadcn/dropdown-menu";

/**
 * Выход: 401 означает «уже разлогинен», поэтому ошибка пользователю не показывается —
 * любой исход заканчивается редиректом на вход.
 */
export const SignOutButton = () => {
    const router = useRouter();
    const signOut = useSignOut();

    const handleSignOut = async () => {
        try {
            await signOut.mutateAsync();
        } catch {
            // Состояние сессии всё равно сброшено, пользователю показать нечего.
        } finally {
            router.replace(routes.login);
        }
    };

    return (
        <DropdownMenuItem disabled={signOut.isPending} onClick={handleSignOut}>
            <LogOut />
            Выйти
        </DropdownMenuItem>
    );
};
