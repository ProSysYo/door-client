"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";
import { KnobsTable } from "../components/knobs-table";
import { KnobForm } from "../components/knob-form";
import { Loader } from "@/shared/components/loader";
import { useGetKnobs } from "@/entities/knobs/knobs.queries";
import type { Knob } from "@/entities/knobs/knobs.types";

type DialogMode = { mode: "create" } | { mode: "edit"; knob: Knob };

export const KnobsList = () => {
    const { data, isLoading } = useGetKnobs();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editKnob = dialog.mode === "edit" ? dialog.knob : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (knob: Knob) => {
        setDialog({ mode: "edit", knob });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Ручки</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить ручку
                    <Plus size={20} />
                </Button>
            </div>

            <KnobsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editKnob ? "Редактировать ручку" : "Добавить ручку"}
                description={editKnob ? "Измените данные ручки" : "Заполните данные для создания новой ручки"}
            >
                <KnobForm
                    editId={editKnob?.id}
                    initialValues={editKnob ? { name: editKnob.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
