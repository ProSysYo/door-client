"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Paint } from "@/entities/paints/paints.types";
import { useDeletePaint } from "@/entities/paints/paints.mutations";

const paintColumns: ColumnDef<Paint>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface PaintsTableProps {
    data: Paint[];
    onEdit: (paint: Paint) => void;
}

export const PaintsTable = ({ data, onEdit }: PaintsTableProps) => {
    const deletePaint = useDeletePaint();

    return (
        <CatalogTable
            data={data}
            columns={paintColumns}
            emptyContent="Ничего не найдены"
            ariaLabel="Таблица цветов покраски"
            onDelete={async (id) => {
                await deletePaint.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
