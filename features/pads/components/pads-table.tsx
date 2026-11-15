"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Pad } from "@/entities/pads/pads.types";
import { useDeletePad } from "@/entities/pads/pads.mutations";

const padColumns: ColumnDef<Pad>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface PadsTableProps {
    data: Pad[];
    onEdit: (pad: Pad) => void;
}

export const PadsTable = ({ data, onEdit }: PadsTableProps) => {
    const deletePad = useDeletePad();

    return (
        <CatalogTable
            data={data}
            columns={padColumns}
            emptyContent="Накладки не найдены"
            ariaLabel="Таблица накладок"
            onDelete={async (id) => {
                await deletePad.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
