"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Model } from "@/entities/models/models.types";
import { useDeleteModel } from "@/entities/models/models.mutations";

const modelColumns: ColumnDef<Model>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface ModelsTableProps {
    data: Model[];
    onEdit: (model: Model) => void;
}

export const ModelsTable = ({ data, onEdit }: ModelsTableProps) => {
    const deleteModel = useDeleteModel();

    return (
        <CatalogTable
            data={data}
            columns={modelColumns}
            emptyContent="Модели не найдены"
            ariaLabel="Таблица моделей"
            onDelete={async (id) => {
                await deleteModel.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
