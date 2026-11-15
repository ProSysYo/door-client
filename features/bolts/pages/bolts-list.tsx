"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { BoltsTable } from "../components/bolts-table";
import { BoltForm } from "../components/bolt-form";
import { useGetBolts } from "@/entities/bolts/bolts.queries";
import { Bolt } from "@/entities/bolts/bolts.types";

type DialogMode = { mode: "create" } | { mode: "edit"; bolt: Bolt };

export const BoltsList = () => {
    const { data, isLoading } = useGetBolts();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editBolt = dialog.mode === "edit" ? dialog.bolt : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (bolt: Bolt) => {
        setDialog({ mode: "edit", bolt });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Засовы</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить засов
                    <Plus size={20} />
                </Button>
            </div>

            <BoltsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editBolt ? "Редактировать засов" : "Добавить засов"}
                description={editBolt ? "Измените данные засова" : "Заполните данные для создания нового засова"}
            >
                <BoltForm
                    editId={editBolt?.id}
                    initialValues={editBolt ? { name: editBolt.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
