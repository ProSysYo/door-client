"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Peephole } from "@/entities/peepholes/peepholes.types";
import { useDeletePeephole } from "@/entities/peepholes/peepholes.mutations";

const peepholeColumns: ColumnDef<Peephole>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface PeepholesTableProps {
    data: Peephole[];
    onEdit: (peephole: Peephole) => void;
}

export const PeepholesTable = ({ data, onEdit }: PeepholesTableProps) => {
    const deletePeephole = useDeletePeephole();

    return (
        <CatalogTable
            data={data}
            columns={peepholeColumns}
            emptyContent="Глазки не найдены"
            ariaLabel="Таблица глазков"
            onDelete={async (id) => {
                await deletePeephole.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
