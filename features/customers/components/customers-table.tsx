"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Customer } from "@/entities/customers/customers.types";
import { useDeleteCustomer } from "@/entities/customers/customers.mutations";

const customerColumns: ColumnDef<Customer>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    { key: "code", label: "Код", render: (item) => item.code },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface CustomersTableProps {
    data: Customer[];
    onEdit: (customer: Customer) => void;
}

export const CustomersTable = ({ data, onEdit }: CustomersTableProps) => {
    const deleteCustomer = useDeleteCustomer();

    return (
        <CatalogTable
            data={data}
            columns={customerColumns}
            emptyContent="Заказчики не найдены"
            ariaLabel="Таблица заказчиков"
            onDelete={async (id) => {
                await deleteCustomer.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
