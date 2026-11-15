"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { useCreateBolt, useUpdateBolt } from "@/entities/bolts/bolts.mutations";
import { boltFormSchema, BoltFormValues } from "../bolt-schema";

interface BoltFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string } | null;
}

export const BoltForm = ({ onSuccess, editId, initialValues }: BoltFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreateBolt();
    const updateMutation = useUpdateBolt();

    const [values, setValues] = useState<BoltFormValues>({
        name: initialValues?.name ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof BoltFormValues, string>>>({});

    const setField = <K extends keyof BoltFormValues>(field: K, value: BoltFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): BoltFormValues | null => {
        const result = boltFormSchema.safeParse(values);
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
                toast.success(`Добавлен засов: ${data.name}`);
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof BoltFormValues)[]);
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
