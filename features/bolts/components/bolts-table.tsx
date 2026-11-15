"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Bolt } from "@/entities/bolts/bolts.types";
import { useDeleteBolt } from "@/entities/bolts/bolts.mutations";

const boltColumns: ColumnDef<Bolt>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface BoltsTableProps {
    data: Bolt[];
    onEdit: (bolt: Bolt) => void;
}

export const BoltsTable = ({ data, onEdit }: BoltsTableProps) => {
    const deleteBolt = useDeleteBolt();

    return (
        <CatalogTable
            data={data}
            columns={boltColumns}
            emptyContent="Засовы не найдены"
            ariaLabel="Таблица засовов"
            onDelete={async (id) => {
                await deleteBolt.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
