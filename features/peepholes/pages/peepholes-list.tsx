"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { PeepholesTable } from "../components/peepholes-table";
import { PeepholeForm } from "../components/peephole-form";
import { useGetPeepholes } from "@/entities/peepholes/peepholes.queries";
import { Peephole } from "@/entities/peepholes/peepholes.types";

type DialogMode = { mode: "create" } | { mode: "edit"; peephole: Peephole };

export const PeepholesList = () => {
    const { data, isLoading } = useGetPeepholes();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editPeephole = dialog.mode === "edit" ? dialog.peephole : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (peephole: Peephole) => {
        setDialog({ mode: "edit", peephole });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Глазки</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить глазок
                    <Plus size={20} />
                </Button>
            </div>

            <PeepholesTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editPeephole ? "Редактировать глазок" : "Добавить глазок"}
                description={editPeephole ? "Измените данные глазка" : "Заполните данные для создания нового глазка"}
            >
                <PeepholeForm
                    editId={editPeephole?.id}
                    initialValues={editPeephole ? { name: editPeephole.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
