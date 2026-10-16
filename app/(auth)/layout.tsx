import { RedirectIfAuthenticated } from "@/features/auth/components/auth-guard";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <RedirectIfAuthenticated>
            <div className="grid min-h-dvh w-full flex-1 place-items-center bg-muted/40 p-6">{children}</div>
        </RedirectIfAuthenticated>
    );
}
