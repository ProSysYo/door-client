"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { FoilsTable } from "../components/foils-table";
import { FoilForm } from "../components/foil-form";
import { useGetFoils } from "@/entities/foils/foils.queries";
import { Foil } from "@/entities/foils/foils.types";

type DialogMode = { mode: "create" } | { mode: "edit"; foil: Foil };

export const FoilsList = () => {
    const { data, isLoading } = useGetFoils();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editFoil = dialog.mode === "edit" ? dialog.foil : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (foil: Foil) => {
        setDialog({ mode: "edit", foil });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Пленки мдф</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить пленку
                    <Plus size={20} />
                </Button>
            </div>

            <FoilsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editFoil ? "Редактировать пленку" : "Добавить пленку"}
                description={editFoil ? "Измените данные пленки" : "Заполните данные для создания новой пленки"}
            >
                <FoilForm
                    editId={editFoil?.id}
                    initialValues={editFoil ? { name: editFoil.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
