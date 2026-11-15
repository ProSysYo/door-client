"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { useCreateHinge, useUpdateHinge } from "@/entities/hinges/hinges.mutations";
import { hingeFormSchema, HingeFormValues } from "../hinge-schema";

interface HingeFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export const HingeForm = ({ onSuccess, editId, initialValues }: HingeFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreateHinge();
    const updateMutation = useUpdateHinge();

    const [values, setValues] = useState<HingeFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof HingeFormValues, string>>>({});

    const setField = <K extends keyof HingeFormValues>(field: K, value: HingeFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): HingeFormValues | null => {
        const result = hingeFormSchema.safeParse(values);
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
                toast.success(`Добавлена петля: ${data.name}`);
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof HingeFormValues)[]);
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
