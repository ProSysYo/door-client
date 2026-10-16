import { Ref } from "react";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/shared/components/shadcn/combobox";
import { Field, FieldDescription, FieldLabel } from "@/shared/components/shadcn/field";

export type ComboboxOption = {
    value: string;
    label: string;
};

export interface ComboboxFieldProps {
    id?: string;
    label?: string;
    placeholder?: string;
    emptyText?: string;
    items: ComboboxOption[];
    value?: string;
    onValueChange: (value: string) => void;
    error?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}

export const ComboboxField = ({
    id,
    label,
    placeholder = "Выберите значение",
    emptyText = "Ничего не найдено",
    items,
    value,
    onValueChange,
    error,
    description,
    required,
    disabled,
    className,
    ref,
}: ComboboxFieldProps) => {
    const selected = items.find((item) => item.value === value);
    const displayValue = selected?.label ?? "";

    return (
        <Field data-invalid={!!error} className={className} ref={ref}>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

            <Combobox
                id={id}
                items={items}
                value={displayValue}
                required={required}
                disabled={disabled}
                onValueChange={(key) => onValueChange(key ?? "")}
            >
                <ComboboxInput placeholder={placeholder} aria-invalid={!!error} />
                <ComboboxContent>
                    <ComboboxEmpty>{emptyText}</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item.value} value={item.value}>
                                {item.label}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {description && !error && <FieldDescription>{description}</FieldDescription>}
            {error && <FieldDescription>{error}</FieldDescription>}
        </Field>
    );
};
