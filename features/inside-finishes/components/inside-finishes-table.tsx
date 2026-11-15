"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { InsideFinish } from "@/entities/inside-finishes/inside-finishes.types";
import { useDeleteInsideFinish } from "@/entities/inside-finishes/inside-finishes.mutations";

const insideFinishColumns: ColumnDef<InsideFinish>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface InsideFinishesTableProps {
    data: InsideFinish[];
    onEdit: (insideFinish: InsideFinish) => void;
}

export const InsideFinishesTable = ({ data, onEdit }: InsideFinishesTableProps) => {
    const deleteInsideFinish = useDeleteInsideFinish();

    return (
        <CatalogTable
            data={data}
            columns={insideFinishColumns}
            emptyContent="Отделки внутри не найдены"
            ariaLabel="Таблица отделок внутри"
            onDelete={async (id) => {
                await deleteInsideFinish.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
