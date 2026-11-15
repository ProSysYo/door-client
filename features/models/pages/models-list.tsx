"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { ModelsTable } from "../components/models-table";
import { ModelForm } from "../components/model-form";
import { useGetModels } from "@/entities/models/models.queries";
import { Model } from "@/entities/models/models.types";

type DialogMode = { mode: "create" } | { mode: "edit"; model: Model };

export const ModelsList = () => {
    const { data, isLoading } = useGetModels();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editModel = dialog.mode === "edit" ? dialog.model : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (model: Model) => {
        setDialog({ mode: "edit", model });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Модели</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить модель
                    <Plus size={20} />
                </Button>
            </div>

            <ModelsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editModel ? "Редактировать модель" : "Добавить модель"}
                description={editModel ? "Измените данные модели" : "Заполните данные для создания новой модели"}
            >
                <ModelForm
                    editId={editModel?.id}
                    initialValues={editModel ? { name: editModel.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
