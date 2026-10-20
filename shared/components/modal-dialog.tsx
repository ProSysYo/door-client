"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./shadcn/dialog";

interface ModalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: ReactNode;
}

export const ModalDialog = ({ open, onOpenChange, title, description, children }: ModalDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md"
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    (event.currentTarget as HTMLElement | null)?.focus();
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};
