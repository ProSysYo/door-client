"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Ear } from "@/entities/ears/ears.types";
import { useDeleteEar } from "@/entities/ears/ears.mutations";

const earColumns: ColumnDef<Ear>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface EarsTableProps {
    data: Ear[];
    onEdit: (ear: Ear) => void;
}

export const EarsTable = ({ data, onEdit }: EarsTableProps) => {
    const deleteEar = useDeleteEar();

    return (
        <CatalogTable
            data={data}
            columns={earColumns}
            emptyContent="Уши не найдены"
            ariaLabel="Таблица ушей"
            onDelete={async (id) => {
                await deleteEar.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
