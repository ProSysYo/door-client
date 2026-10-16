"use client";

import { SidebarProvider } from "@/shared/components/shadcn/sidebar";
import { TooltipProvider } from "@/shared/components/shadcn/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
        </SidebarProvider>
    );
}
