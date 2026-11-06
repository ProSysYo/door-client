"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { ModalDialog } from "@/shared/components/modal-dialog";

import { Loader } from "@/shared/components/loader";
import { useGetPackagings } from "@/entities/packagings/packagings.queries";
import { Packaging } from "@/entities/packagings/packagings.types";
import { PackagingsTable } from "../components/packagings-table";
import { PackagingForm } from "../components/packaging-form";

type DialogMode = { mode: "create" } | { mode: "edit"; packaging: Packaging };

export const PackagingsList = () => {
    const { data, isLoading } = useGetPackagings();

    const [dialog, setDialog] = useState<DialogMode>({ mode: "create" });
    const [open, setOpen] = useState(false);

    if (isLoading) return <Loader />;

    const editPackaging = dialog.mode === "edit" ? dialog.packaging : null;

    const openCreate = () => {
        setDialog({ mode: "create" });
        setOpen(true);
    };

    const openEdit = (packaging: Packaging) => {
        setDialog({ mode: "edit", packaging });
        setOpen(true);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Упраковки</h1>
                <Button variant="default" size="lg" onClick={openCreate}>
                    Добавить упаковку
                    <Plus size={20} />
                </Button>
            </div>

            <PackagingsTable data={data || []} onEdit={openEdit} />

            <ModalDialog
                open={open}
                onOpenChange={setOpen}
                title={editPackaging ? "Редактировать упаковку" : "Добавить упаковку"}
                description={editPackaging ? "Измените данные упаковки" : "Заполните данные для создания новой упаковки"}
            >
                <PackagingForm
                    editId={editPackaging?.id}
                    initialValues={editPackaging ? { name: editPackaging.name } : null}
                    onSuccess={() => setOpen(false)}
                />
            </ModalDialog>
        </div>
    );
};
