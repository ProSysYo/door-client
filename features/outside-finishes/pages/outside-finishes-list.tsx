"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { OutsideFinishesTable } from "../components/outside-finishes-table";
import { OutsideFinishForm } from "../components/outside-finish-form";
import { useGetOutsideFinishes } from "@/entities/outside-finishes/outside-finishes.queries";
import { OutsideFinish } from "@/entities/outside-finishes/outside-finishes.types";

type DialogMode = { mode: "create" } | { mode: "edit"; outsideFinish: OutsideFinish };

export const OutsideFinishesList = () => {
    const { data, isLoading } = useGetOutsideFinishes();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editOutsideFinish = dialog.mode === "edit" ? dialog.outsideFinish : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (outsideFinish: OutsideFinish) => {
        setDialog({ mode: "edit", outsideFinish });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Отделки снаружи</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить отделку
                    <Plus size={20} />
                </Button>
            </div>

            <OutsideFinishesTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editOutsideFinish ? "Редактировать отделку" : "Добавить отделку"}
                description={editOutsideFinish ? "Измените данные отделки" : "Заполните данные для создания новой отделки"}
            >
                <OutsideFinishForm
                    editId={editOutsideFinish?.id}
                    initialValues={editOutsideFinish ? { name: editOutsideFinish.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
