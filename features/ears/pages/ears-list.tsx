"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { EarsTable } from "../components/ears-table";
import { EarForm } from "../components/ear-form";
import { useGetEars } from "@/entities/ears/ears.queries";
import { Ear } from "@/entities/ears/ears.types";

type DialogMode = { mode: "create" } | { mode: "edit"; ear: Ear };

export const EarsList = () => {
    const { data, isLoading } = useGetEars();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editEar = dialog.mode === "edit" ? dialog.ear : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (ear: Ear) => {
        setDialog({ mode: "edit", ear });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Уши</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить ухо
                    <Plus size={20} />
                </Button>
            </div>

            <EarsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editEar ? "Редактировать ухо" : "Добавить ухо"}
                description={editEar ? "Измените данные уха" : "Заполните данные для создания нового уха"}
            >
                <EarForm
                    editId={editEar?.id}
                    initialValues={editEar ? { name: editEar.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
