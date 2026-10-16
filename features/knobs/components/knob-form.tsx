"use client";

import { useState } from "react";
//import { useRouter } from "next/navigation";
import { knobFormSchema, KnobFormValues } from "../knob-schema";
import { useCreateKnob, useUpdateKnob } from "@/entities/knobs/knobs.mutations";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { toast } from "sonner";

interface KnobFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export const KnobForm = ({ onSuccess, editId, initialValues }: KnobFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreateKnob();
    const updateMutation = useUpdateKnob();

    const [values, setValues] = useState<KnobFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof KnobFormValues, string>>>({});

    const setField = <K extends keyof KnobFormValues>(field: K, value: KnobFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): KnobFormValues | null => {
        const result = knobFormSchema.safeParse(values);
        if (!result.success) {
            const fieldErrors = result.error.issues;
            const parsed: Partial<Record<keyof KnobFormValues, string>> = {};
            for (const issue of fieldErrors) {
                if (issue.path[0]) {
                    parsed[issue.path[0] as keyof KnobFormValues] = issue.message;
                }
            }
            setErrors(parsed);
            return null;
        }
        setErrors({});
        return result.data;
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async () => {
        const data = validate();
        if (!data) return;

        try {
            if (isEdit && editId) {
                await updateMutation.mutateAsync({ id: editId, data });
                toast.success("Данные обновлены");
            } else {
                await createMutation.mutateAsync(data);
                toast.success(`Добавлена ручка: ${data.name}`);
            }
            //setValues({ name: "" });
            onSuccess?.();
            //router.back();
        } catch {
            toast.error("Ошибка при сохранении");
        }
    };

    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <InputField
                id="name"
                label="Название"
                value={values.name}
                placeholder="Введите название"
                error={errors.name}
                type="text"
                onChange={(e) => setField("name", e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Сохранение..." : editId ? "Обновить" : "Создать"}
            </Button>
        </div>
    );
};
