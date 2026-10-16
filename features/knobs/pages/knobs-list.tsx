"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { FormDialog } from "@/shared/components/form-dialog";
import { KnobsTable } from "../components/knobs-table";
import { KnobForm } from "../components/knob-form";
import { Loader } from "@/shared/components/loader";
import { useGetKnobs } from "@/entities/knobs/knobs.queries";
import type { Knob } from "@/entities/knobs/knobs.types";

type DialogMode = { mode: "create" } | { mode: "edit"; knob: Knob } | null;

export const KnobsList = () => {
    const { data, isLoading } = useGetKnobs();

    const [dialog, setDialog] = useState<DialogMode>(null);
    const [isPending, setIsPending] = useState(false);
    const submitRef = useRef<(() => void) | null>(null);

    if (isLoading) return <Loader />;

    const knobs = data?.items ?? [];
    const isEdit = dialog?.mode === "edit";

    const closeDialog = () => setDialog(null);

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Ручки</h1>
                <Button variant="default" size="lg" onClick={() => setDialog({ mode: "create" })}>
                    Добавить ручку
                    <Plus size={20} />
                </Button>
            </div>

            <KnobsTable
                data={knobs}
                onEdit={(knob) => setDialog({ mode: "edit", knob })}
            />

            {/* key сбрасывает состояние формы при каждой смене режима/записи */}
            <FormDialog
                open={dialog !== null}
                onOpenChange={(open) => { if (!open) closeDialog(); }}
                title={isEdit ? "Редактировать ручку" : "Добавить ручку"}
                description={isEdit ? "Измените данные ручки" : "Заполните данные для создания новой ручки"}
                submitLabel={isEdit ? "Обновить" : "Создать"}
                isPending={isPending}
                onSubmit={() => submitRef.current?.()}
            >
                <KnobForm
                    key={isEdit ? dialog.knob.id : "create"}
                    editId={isEdit ? dialog.knob.id : undefined}
                    initialValues={isEdit ? { name: dialog.knob.name } : null}
                    onSuccess={closeDialog}
                    hideButton
                    submitRef={submitRef}
                    onPendingChange={setIsPending}
                />
            </FormDialog>
        </div>
    );
};
