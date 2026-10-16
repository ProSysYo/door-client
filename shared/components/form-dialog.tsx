"use client";

import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./shadcn/dialog";
import { Button } from "./shadcn/button";

interface FormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    onSubmit: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    isPending?: boolean;
    children: ReactNode;
}

export const FormDialog = ({
    open,
    onOpenChange,
    title,
    description,
    onSubmit,
    submitLabel = "Сохранить",
    cancelLabel = "Отмена",
    isPending = false,
    children,
}: FormDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md"
                // Radix сам фокусирует первое поле: на мобильных всплывает клавиатура,
                // а при редактировании выделяется весь текст. Фокус держим на контейнере,
                // чтобы ловушка Tab и возврат фокуса при закрытии остались рабочими.
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    (event.currentTarget as HTMLElement | null)?.focus();
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div className="py-2">{children}</div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                        {cancelLabel}
                    </Button>
                    <Button onClick={onSubmit} disabled={isPending}>
                        {isPending ? "Сохранение..." : submitLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
