"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { InsideFinishesTable } from "../components/inside-finishes-table";
import { InsideFinishForm } from "../components/inside-finish-form";
import { useGetInsideFinishes } from "@/entities/inside-finishes/inside-finishes.queries";
import { InsideFinish } from "@/entities/inside-finishes/inside-finishes.types";

type DialogMode = { mode: "create" } | { mode: "edit"; insideFinish: InsideFinish };

export const InsideFinishesList = () => {
    const { data, isLoading } = useGetInsideFinishes();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editInsideFinish = dialog.mode === "edit" ? dialog.insideFinish : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (insideFinish: InsideFinish) => {
        setDialog({ mode: "edit", insideFinish });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Отделки внутри</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить отделку
                    <Plus size={20} />
                </Button>
            </div>

            <InsideFinishesTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editInsideFinish ? "Редактировать отделку" : "Добавить отделку"}
                description={editInsideFinish ? "Измените данные отделки" : "Заполните данные для создания новой отделки"}
            >
                <InsideFinishForm
                    editId={editInsideFinish?.id}
                    initialValues={editInsideFinish ? { name: editInsideFinish.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
