"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Foil } from "@/entities/foils/foils.types";
import { useDeleteFoil } from "@/entities/foils/foils.mutations";

const foilColumns: ColumnDef<Foil>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface FoilsTableProps {
    data: Foil[];
    onEdit: (foil: Foil) => void;
}

export const FoilsTable = ({ data, onEdit }: FoilsTableProps) => {
    const deleteFoil = useDeleteFoil();

    return (
        <CatalogTable
            data={data}
            columns={foilColumns}
            emptyContent="Пленки не найдены"
            ariaLabel="Таблица пленок мдф"
            onDelete={async (id) => {
                await deleteFoil.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
