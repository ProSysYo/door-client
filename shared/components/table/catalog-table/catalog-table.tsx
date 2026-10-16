"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/table";
import { RowActions } from "./row-actions";
import ConfirmDialog from "../../confirm-dialog";
import { toast } from "sonner";

export type ColumnDef<T> = {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
};

type Props<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    emptyContent: string;
    ariaLabel: string;
    onDelete?: (id: number) => Promise<void>;
    getEditHref?: (item: T) => string;
    onEdit?: (item: T) => void;
};

function CatalogTableInner<T extends { id: number }>({
    data,
    columns,
    emptyContent,
    ariaLabel,
    onDelete,
    getEditHref,
    onEdit,
}: Props<T>) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const safeData = data ?? [];

    const handleDelete = async () => {
        if (confirmDeleteId === null || !onDelete) return;

        setDeletingId(confirmDeleteId);

        try {
            await onDelete(confirmDeleteId);
            toast.success("Запись успешно удалена");
            router.refresh();
        } catch {
            toast.error("Ошибка при удалении");
        }

        setDeletingId(null);
        setConfirmDeleteId(null);
    };

    const handleOpenConfirm = (id: number) => {
        if (!onDelete) return;
        setConfirmDeleteId(id);
    };

    const renderRowActions = (item: T) => {
        if (!onEdit && !getEditHref) return null;

        return (
            <RowActions
                id={item.id}
                editHref={getEditHref?.(item)}
                onEdit={onEdit ? () => onEdit(item) : undefined}
                onDelete={() => handleOpenConfirm(item.id)}
                isLoading={deletingId === item.id}
            />
        );
    };

    const hasActionsColumn = columns.some((col) => col.key === "actions");

    const finalColumns = [...columns];
    if (!hasActionsColumn && (onDelete || getEditHref || onEdit)) {
        finalColumns.push({
            key: "actions",
            label: "Действия",
            className: "w-[100px]",
        });
    }

    const renderCell = (col: ColumnDef<T>, item: T) => {
        if (col.key === "actions") {
            return renderRowActions(item);
        }

        if (col.render) {
            return col.render(item);
        }

        const value = item[col.key as keyof T];
        return value != null ? String(value) : "";
    };

    return (
        <>
            <div className="relative w-full overflow-auto rounded-md border">
                <Table aria-label={ariaLabel}>
                    <TableHeader>
                        <TableRow>
                            {finalColumns.map((column) => (
                                <TableHead key={String(column.key)} className={column.headerClassName}>
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {safeData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={finalColumns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyContent}
                                </TableCell>
                            </TableRow>
                        ) : (
                            safeData.map((item) => (
                                <TableRow key={item.id}>
                                    {finalColumns.map((col) => (
                                        <TableCell key={String(col.key)} className={col.className}>
                                            {renderCell(col, item)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <ConfirmDialog
                isOpen={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={handleDelete}
                title="Вы уверены?"
                confirmText="Удалить"
                cancelText="Отмена"
            >
                Это действие нельзя отменить. Вы действительно хотите удалить эту запись?
            </ConfirmDialog>
        </>
    );
}

export const CatalogTable = React.memo(CatalogTableInner) as <T extends { id: number }>(
    props: Props<T> & { ref?: React.Ref<unknown> },
) => React.ReactNode;
