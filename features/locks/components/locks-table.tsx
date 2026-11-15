"use client";

import { ColumnDef, CatalogTable } from "@/shared/components/table/catalog-table/catalog-table";
import { Lock } from "@/entities/locks/locks.types";
import { useDeleteLock } from "@/entities/locks/locks.mutations";

const lockColumns: ColumnDef<Lock>[] = [
    { key: "name", label: "Название", render: (item) => item.name },
    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => new Date(item.updatedAt).toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

interface LocksTableProps {
    data: Lock[];
    onEdit: (lock: Lock) => void;
}

export const LocksTable = ({ data, onEdit }: LocksTableProps) => {
    const deleteLock = useDeleteLock();

    return (
        <CatalogTable
            data={data}
            columns={lockColumns}
            emptyContent="Замки не найдены"
            ariaLabel="Таблица замков"
            onDelete={async (id) => {
                await deleteLock.mutateAsync(id);
            }}
            onEdit={onEdit}
        />
    );
};
