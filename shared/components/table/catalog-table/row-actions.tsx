"use client";

import { Edit } from "lucide-react";
import { DeleteBtn } from "@/shared/components/table/delete-btn";
import { EditLink } from "@/shared/components/table/edit-link";
import { Button } from "@/shared/components/shadcn/button";

type RowActionsProps = {
    id: number;
    editHref?: string;
    onEdit?: () => void;
    onDelete: () => void;
    isLoading: boolean;
};

export const RowActions = ({ editHref, onEdit, onDelete, isLoading }: RowActionsProps) => {
    return (
        <div className="flex gap-1">
            {onEdit ? (
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    aria-label="Редактировать"
                    onClick={onEdit}
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                >
                    <Edit className="h-4 w-4" />
                </Button>
            ) : editHref ? (
                <EditLink href={editHref} />
            ) : null}
            <DeleteBtn isLoading={isLoading} onDelete={onDelete} />
        </div>
    );
};
