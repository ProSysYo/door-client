"use client";

import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { toast } from "sonner";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { useCreateCustomer, useUpdateCustomer } from "@/entities/customers/customers.mutations";
import { customerFormSchema, CustomerFormValues } from "../customer-schema";

interface CustomerFormProps {
    onSuccess?: () => void;
    editId?: number;
    initialValues?: { name?: string; code?: string } | null;
}

export const CustomerForm = ({ onSuccess, editId, initialValues }: CustomerFormProps) => {
    const isEdit = !!editId;
    const createMutation = useCreateCustomer();
    const updateMutation = useUpdateCustomer();

    const [values, setValues] = useState<CustomerFormValues>({
        name: initialValues?.name ?? "",
        code: initialValues?.code ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormValues, string>>>({});

    const setField = <K extends keyof CustomerFormValues>(field: K, value: CustomerFormValues[K]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): CustomerFormValues | null => {
        const result = customerFormSchema.safeParse(values);
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
                toast.success(`Добавлен заказчик: ${data.name}`);
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof CustomerFormValues)[]);
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
            <InputField
                id="code"
                label="Код"
                value={values.code}
                placeholder="Например D001"
                error={errors.code}
                type="text"
                onChange={(e) => setField("code", e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Сохранение..." : editId ? "Обновить" : "Создать"}
            </Button>
        </div>
    );
};
