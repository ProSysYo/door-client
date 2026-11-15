"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { PadsTable } from "../components/pads-table";
import { PadForm } from "../components/pad-form";
import { useGetPads } from "@/entities/pads/pads.queries";
import { Pad } from "@/entities/pads/pads.types";

type DialogMode = { mode: "create" } | { mode: "edit"; pad: Pad };

export const PadsList = () => {
    const { data, isLoading } = useGetPads();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editPad = dialog.mode === "edit" ? dialog.pad : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (pad: Pad) => {
        setDialog({ mode: "edit", pad });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Накладки</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить накладку
                    <Plus size={20} />
                </Button>
            </div>

            <PadsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editPad ? "Редактировать накладку" : "Добавить накладку"}
                description={editPad ? "Измените данные накладки" : "Заполните данные для создания новой накладки"}
            >
                <PadForm
                    editId={editPad?.id}
                    initialValues={editPad ? { name: editPad.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
