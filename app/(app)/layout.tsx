import { RequireAuth } from "@/features/auth/components/auth-guard";
import { AppShell } from "@/shared/components/app-shell";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <RequireAuth>
            <AppShell>{children}</AppShell>
        </RequireAuth>
    );
}
