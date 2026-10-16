import { ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./shadcn/alert-dialog";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isConfirmDanger?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Подтвердите действие",
    children,
    confirmText = "Да",
    cancelText = "Нет",
    isConfirmDanger = true,
}: Props) {
    if (!isOpen) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{children}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel> {cancelText}</AlertDialogCancel>
                    <AlertDialogAction
                        variant={isConfirmDanger ? "destructive" : "default"}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
