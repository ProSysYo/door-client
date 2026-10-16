"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/shared/components/shadcn/sidebar";
import { TooltipProvider } from "@/shared/components/shadcn/tooltip";
import { useQueryClientState } from "@/shared/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClientState();

    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                <TooltipProvider>{children}</TooltipProvider>
            </SidebarProvider>
        </QueryClientProvider>
    );
}
