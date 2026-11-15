"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { useCreateOutsideFinish, useUpdateOutsideFinish } from "@/entities/outside-finishes/outside-finishes.mutations";
import { outsideFinishFormSchema, OutsideFinishFormValues } from "../outside-finish-schema";

interface OutsideFinishFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export const OutsideFinishForm = ({ onSuccess, editId, initialValues }: OutsideFinishFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreateOutsideFinish();
    const updateMutation = useUpdateOutsideFinish();

    const [values, setValues] = useState<OutsideFinishFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof OutsideFinishFormValues, string>>>({});

    const setField = <K extends keyof OutsideFinishFormValues>(field: K, value: OutsideFinishFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): OutsideFinishFormValues | null => {
        const result = outsideFinishFormSchema.safeParse(values);
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
                toast.success(`Добавлена отделка: ${data.name}`);
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof OutsideFinishFormValues)[]);
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
