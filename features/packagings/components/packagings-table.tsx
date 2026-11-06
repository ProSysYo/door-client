"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Packaging } from "@/entities/packagings/packagings.types";
import { useDeletePackaging } from "@/entities/packagings/packagings.mutations";

const columns: ColumnDef<Packaging>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface PackagingsTableProps {
    data: Packaging[];
    onEdit: (knob: Packaging) => void;
}

export const PackagingsTable = ({ data, onEdit }: PackagingsTableProps) => {
    const deletePackaging = useDeletePackaging();

    return (
        <CatalogTable
            data={data}
            columns={columns}
            emptyContent="Упаковки не найдены"
            ariaLabel="Таблица упаковок"
            onDelete={async (id) => {
                await deletePackaging.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
