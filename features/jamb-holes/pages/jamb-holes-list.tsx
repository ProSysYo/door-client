"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { JambHolesTable } from "../components/jamb-holes-table";
import { JambHoleForm } from "../components/jamb-hole-form";
import { useGetJambHoles } from "@/entities/jamb-holes/jamb-holes.queries";
import { JambHole } from "@/entities/jamb-holes/jamb-holes.types";

type DialogMode = { mode: "create" } | { mode: "edit"; jambHole: JambHole };

export const JambHolesList = () => {
    const { data, isLoading } = useGetJambHoles();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editJambHole = dialog.mode === "edit" ? dialog.jambHole : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (jambHole: JambHole) => {
        setDialog({ mode: "edit", jambHole });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Отверстия в коробе</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить отверстие
                    <Plus size={20} />
                </Button>
            </div>

            <JambHolesTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editJambHole ? "Редактировать отверстие" : "Добавить отверстие"}
                description={editJambHole ? "Измените данные отверстия" : "Заполните данные для создания нового отверстия"}
            >
                <JambHoleForm
                    editId={editJambHole?.id}
                    initialValues={editJambHole ? { name: editJambHole.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
