"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { OutsideFinish } from "@/entities/outside-finishes/outside-finishes.types";
import { useDeleteOutsideFinish } from "@/entities/outside-finishes/outside-finishes.mutations";

const outsideFinishColumns: ColumnDef<OutsideFinish>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface OutsideFinishesTableProps {
    data: OutsideFinish[];
    onEdit: (outsideFinish: OutsideFinish) => void;
}

export const OutsideFinishesTable = ({ data, onEdit }: OutsideFinishesTableProps) => {
    const deleteOutsideFinish = useDeleteOutsideFinish();

    return (
        <CatalogTable
            data={data}
            columns={outsideFinishColumns}
            emptyContent="Отделки снаружи не найдены"
            ariaLabel="Таблица отделок снаружи"
            onDelete={async (id) => {
                await deleteOutsideFinish.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
