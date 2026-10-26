"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { PaintsTable } from "../components/paint-table";
import { PaintForm } from "../components/paint-form";
import { useGetPaints } from "@/entities/paints/paints.queries";
import { Paint } from "@/entities/paints/paints.types";

type DialogMode = { mode: "create" } | { mode: "edit"; paint: Paint };

export const PaintsList = () => {
    const { data, isLoading } = useGetPaints();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editPaint = dialog.mode === "edit" ? dialog.paint : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (paint: Paint) => {
        setDialog({ mode: "edit", paint });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Цвета покраски</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить цвет покраски
                    <Plus size={20} />
                </Button>
            </div>

            <PaintsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editPaint ? "Редактировать цвет покраски" : "Добавить цвет покраски"}
                description={editPaint ? "Измените данные цвета покраски" : "Заполните данные для создания нового цвета покраски"}
            >
                <PaintForm
                    editId={editPaint?.id}
                    initialValues={editPaint ? { name: editPaint.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
