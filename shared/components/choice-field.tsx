import { cn } from "cn";
import { Button } from "@/shared/components/shadcn/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/shadcn/field";

type ChoiceFieldProps = {
    label: string;
    options: string[];
    value: string;
    onValueChange: (value: string) => void;
    error?: string;
};

export const ChoiceField = ({ label, options, value, onValueChange, error }: ChoiceFieldProps) => (
    <Field data-invalid={!!error}>
        <FieldLabel>{label}</FieldLabel>
        <div
            className={cn(
                "flex flex-wrap gap-2 rounded-lg border border-transparent p-1",
                error && "border-destructive/40 bg-destructive/5",
            )}
        >
            {options.map((option) => (
                <Button
                    key={option}
                    type="button"
                    size="sm"
                    variant={option === value ? "default" : "outline"}
                    className="min-w-9"
                    aria-pressed={option === value}
                    onClick={() => onValueChange(option)}
                >
                    {option}
                </Button>
            ))}
        </div>
        {error && <FieldError>{error}</FieldError>}
    </Field>
);
