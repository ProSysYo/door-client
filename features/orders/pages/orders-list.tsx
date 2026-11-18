"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { Loader } from "@/shared/components/loader";
import { routes } from "@/config/navigation";
import { OrdersTable } from "../components/orders-table";
import { useGetOrders } from "@/entities/orders/orders.queries";

export const OrdersList = () => {
    const { data, isLoading } = useGetOrders();

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Заказы</h1>
                <Button variant="default" size="lg" asChild>
                    <Link href={routes.ordersNew}>
                        Новый заказ
                        <Plus size={20} />
                    </Link>
                </Button>
            </div>

            <OrdersTable data={data || []} />
        </div>
    );
};
