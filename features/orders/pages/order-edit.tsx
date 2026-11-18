"use client";

import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/shared/components/loader";
import { OrderForm } from "../components/order-form";
import { toOrderFormValues } from "../order-helpers";
import { useOrderSources } from "../use-order-sources";
import { useGetOrder } from "@/entities/orders/orders.queries";

export const OrderEditPage = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const orderId = Number(params.id);

    const { sources, isLoading: isSourcesLoading } = useOrderSources();
    const { data: order, isLoading: isOrderLoading } = useGetOrder(orderId);

    if (isSourcesLoading || isOrderLoading) return <Loader />;

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <h1 className="mb-6 text-2xl font-semibold">Заказ №{params.id}</h1>
            <OrderForm
                sources={sources}
                editId={orderId}
                initialValues={order ? toOrderFormValues(order) : null}
                onSuccess={() => router.back()}
            />
        </div>
    );
};
