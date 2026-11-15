"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { HingesTable } from "../components/hinges-table";
import { HingeForm } from "../components/hinge-form";
import { useGetHinges } from "@/entities/hinges/hinges.queries";
import { Hinge } from "@/entities/hinges/hinges.types";

type DialogMode = { mode: "create" } | { mode: "edit"; hinge: Hinge };

export const HingesList = () => {
    const { data, isLoading } = useGetHinges();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editHinge = dialog.mode === "edit" ? dialog.hinge : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (hinge: Hinge) => {
        setDialog({ mode: "edit", hinge });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Петли</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить петлю
                    <Plus size={20} />
                </Button>
            </div>

            <HingesTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editHinge ? "Редактировать петлю" : "Добавить петлю"}
                description={editHinge ? "Измените данные петли" : "Заполните данные для создания новой петли"}
            >
                <HingeForm
                    editId={editHinge?.id}
                    initialValues={editHinge ? { name: editHinge.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
