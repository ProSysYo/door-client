"use client";

import { useRouter } from "next/navigation";
import { Loader } from "@/shared/components/loader";
import { OrderForm } from "../components/order-form";
import { routes } from "@/config/navigation";
import { useOrderSources } from "../use-order-sources";

export const OrderNewPage = () => {
    const router = useRouter();
    const { sources, isLoading } = useOrderSources();

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="mb-6 text-2xl font-semibold">Новый заказ</h1>
            <OrderForm sources={sources} onSuccess={() => router.push(routes.orders)} />
        </div>
    );
};
