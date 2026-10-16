import React, { useMemo } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "./shadcn/sidebar";
import { navItems, routes } from "@/config/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./shadcn/collapsible";
import { Bell, ChevronRight, ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";
import { Avatar, AvatarFallback } from "./shadcn/avatar";

const matchesPath = (href: string, pathname: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export const AppSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { isMobile } = useSidebar();

    //const initials = (session?.user?.email ?? "??").slice(0, 2).toUpperCase();

    // Активным считается самый специфичный (самый длинный) совпавший роут,
    // чтобы /orders/new не подсвечивал одновременно и /orders
    const activeHref = useMemo(() => {
        const hrefs = navItems.flatMap((item) => item.items?.map((subItem) => subItem.href) ?? []);

        return hrefs.filter((href) => matchesPath(href, pathname)).sort((a, b) => b.length - a.length)[0] ?? null;
    }, [pathname]);

    const handleSignOut = async () => {
        try {
            //await signOut({ redirect: true });
            router.push(routes.login);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={routes.home} className="group/logo">
                                <div className="relative flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-zinc-600 via-zinc-800 to-zinc-950 text-white shadow-sm ring-1 ring-inset ring-white/15 transition-transform duration-300 group-hover/logo:scale-105">
                                    <span className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/3 rotate-12 bg-white/25 blur-md transition-transform duration-500 group-hover/logo:translate-x-[320%]" />
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="relative"
                                        aria-hidden="true"
                                    >
                                        <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
                                        <path d="M8 6.5h1.6M8 10.5h1.6M8 14.5h1.6M8 18h1.6" />
                                        <circle cx="15.4" cy="12" r="1" fill="currentColor" stroke="none" />
                                    </svg>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Железные двери</span>
                                    <span className="truncate text-xs">Управление производством</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const isGroupOpen = item.items?.some((subItem) => subItem.href === activeHref) ?? false;

                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={isGroupOpen}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className="transition-transform hover:translate-x-0.5"
                                            >
                                                {item.icon && (
                                                    <item.icon className="transition-colors group-data-[state=open]/collapsible:text-sidebar-primary" />
                                                )}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => {
                                                    const isActive = subItem.href === activeHref;
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.label}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={isActive}
                                                                className="transition-transform hover:translate-x-0.5 data-[active=true]:font-medium data-[active=true]:text-sidebar-primary"
                                                            >
                                                                <Link href={subItem.href}>
                                                                    <span>{subItem.label}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="relative">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg bg-linear-to-br from-zinc-600 to-zinc-900 text-xs text-white">
                                                {/* {initials} */}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-sidebar bg-emerald-500" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        {/* <span className="truncate text-xs">{session?.user?.email}</span> */}
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <UserRound />
                                        Профиль
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Уведомления
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut}>
                                    <LogOut />
                                    Выйти
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
