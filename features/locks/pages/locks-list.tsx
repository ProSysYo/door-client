"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { LocksTable } from "../components/locks-table";
import { LockForm } from "../components/lock-form";
import { useGetLocks } from "@/entities/locks/locks.queries";
import { Lock } from "@/entities/locks/locks.types";

type DialogMode = { mode: "create" } | { mode: "edit"; lock: Lock };

export const LocksList = () => {
    const { data, isLoading } = useGetLocks();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editLock = dialog.mode === "edit" ? dialog.lock : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (lock: Lock) => {
        setDialog({ mode: "edit", lock });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Замки</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить замок
                    <Plus size={20} />
                </Button>
            </div>

            <LocksTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editLock ? "Редактировать замок" : "Добавить замок"}
                description={editLock ? "Измените данные замка" : "Заполните данные для создания нового замка"}
            >
                <LockForm
                    editId={editLock?.id}
                    initialValues={editLock ? { name: editLock.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
