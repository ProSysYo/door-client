"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Hinge } from "@/entities/hinges/hinges.types";
import { useDeleteHinge } from "@/entities/hinges/hinges.mutations";

const hingeColumns: ColumnDef<Hinge>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface HingesTableProps {
    data: Hinge[];
    onEdit: (hinge: Hinge) => void;
}

export const HingesTable = ({ data, onEdit }: HingesTableProps) => {
    const deleteHinge = useDeleteHinge();

    return (
        <CatalogTable
            data={data}
            columns={hingeColumns}
            emptyContent="Петли не найдены"
            ariaLabel="Таблица петель"
            onDelete={async (id) => {
                await deleteHinge.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
