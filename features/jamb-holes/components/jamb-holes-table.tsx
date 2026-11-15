"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { JambHole } from "@/entities/jamb-holes/jamb-holes.types";
import { useDeleteJambHole } from "@/entities/jamb-holes/jamb-holes.mutations";

const jambHoleColumns: ColumnDef<JambHole>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface JambHolesTableProps {
    data: JambHole[];
    onEdit: (jambHole: JambHole) => void;
}

export const JambHolesTable = ({ data, onEdit }: JambHolesTableProps) => {
    const deleteJambHole = useDeleteJambHole();

    return (
        <CatalogTable
            data={data}
            columns={jambHoleColumns}
            emptyContent="Отверстия не найдены"
            ariaLabel="Таблица отверстий в коробе"
            onDelete={async (id) => {
                await deleteJambHole.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
