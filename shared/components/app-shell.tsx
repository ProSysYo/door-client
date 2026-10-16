"use client";

import { Suspense } from "react";

import { AppSidebar } from "./app-sidebar";
import { SidebarTrigger } from "./shadcn/sidebar";

type AppShellProps = {
    children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
    return (
        <div className="flex h-screen bg-background text-foreground flex-1 ">
            <Suspense fallback={<div />}>
                <AppSidebar />
            </Suspense>
            <SidebarTrigger className="mt-2 ml-2" />

            <div className="flex flex-1 flex-col">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-5xl">{children}</div>
                </main>
            </div>
        </div>
    );
};
