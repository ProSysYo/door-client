import React, { InputHTMLAttributes, Ref } from "react";
import { Field, FieldDescription, FieldLabel } from "./shadcn/field";
import { Input } from "./shadcn/input";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    label?: string;
    error?: string;
    description?: string;
    className?: string;
    ref?: Ref<HTMLInputElement>;
}

export const InputField = ({ id, label, error, description, className, ref, ...inputProps }: InputFieldProps) => {
    return (
        <Field data-invalid={!!error} className={className}>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <Input ref={ref} id={id} aria-invalid={!!error} {...inputProps} />
            {description && !error && <FieldDescription>{description}</FieldDescription>}
            {error && <FieldDescription>{error}</FieldDescription>}
        </Field>
    );
};
