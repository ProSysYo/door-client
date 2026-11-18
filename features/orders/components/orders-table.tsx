"use client";

import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { routes } from "@/config/navigation";
import { Order } from "@/entities/orders/orders.types";
import { useDeleteOrder } from "@/entities/orders/orders.mutations";

const orderColumns: ColumnDef<Order>[] = [
    { key: "customerCode", label: "Заказчик", render: (item) => item.customerCode },
    { key: "model", label: "Модель", render: (item) => item.model },
    { key: "doorsCount", label: "Дверей", render: (item) => item.doorsCount },
    {
        key: "size",
        label: "Габариты, мм",
        render: (item) => `${item.height}×${item.width}`,
    },
    {
        key: "orderDate",
        label: "Дата оформления",
        render: (item) => (item.orderDate ? new Date(item.orderDate).toLocaleDateString("ru-RU") : "—"),
    },
    {
        key: "price",
        label: "Стоимость, ₽",
        render: (item) => (item.price ? `${item.price} ₽` : "—"),
    },
];

interface OrdersTableProps {
    data: Order[];
}

export const OrdersTable = ({ data }: OrdersTableProps) => {
    const deleteOrder = useDeleteOrder();

    return (
        <CatalogTable
            data={data}
            columns={orderColumns}
            emptyContent="Заказы не найдены"
            ariaLabel="Таблица заказов"
            onDelete={async (id) => {
                await deleteOrder.mutateAsync(id);
            }}
            getEditHref={(order) => routes.orderEdit(order.id)}
        />
    );
};
