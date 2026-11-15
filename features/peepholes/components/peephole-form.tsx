"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { useCreatePeephole, useUpdatePeephole } from "@/entities/peepholes/peepholes.mutations";
import { peepholeFormSchema, PeepholeFormValues } from "../peephole-schema";

interface PeepholeFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export const PeepholeForm = ({ onSuccess, editId, initialValues }: PeepholeFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreatePeephole();
    const updateMutation = useUpdatePeephole();

    const [values, setValues] = useState<PeepholeFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PeepholeFormValues, string>>>({});

    const setField = <K extends keyof PeepholeFormValues>(field: K, value: PeepholeFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): PeepholeFormValues | null => {
        const result = peepholeFormSchema.safeParse(values);
        if (!result.success) {
            setErrors(parseZodErrors(result.error));
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
                toast.success(`Добавлен глазок: ${data.name}`);
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof PeepholeFormValues)[]);
            setErrors(fields);
            if (message) toast.error(message);
        }
    };

    return (
        <div className="flex w-full flex-col gap-4">
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
