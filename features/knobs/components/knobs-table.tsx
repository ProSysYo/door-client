"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Knob } from "@/entities/knobs/knobs.types";
import { useDeleteKnob } from "@/entities/knobs/knobs.mutations";
import { routes } from "@/config/navigation";

const knobColumns: ColumnDef<Knob>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface KnobsTableProps {
    data: Knob[];
}

export const KnobsTable = ({ data }: KnobsTableProps) => {
    const deleteKnob = useDeleteKnob();

    return (
        <CatalogTable
            data={data}
            columns={knobColumns}
            emptyContent="Ручки не найдены"
            ariaLabel="Таблица ручек"
            onDelete={async (id) => {
                await deleteKnob.mutateAsync(id);
            }}
            getEditHref={(item) => `${routes.knobsEdit}${item.id}`}
        />
    );
};
