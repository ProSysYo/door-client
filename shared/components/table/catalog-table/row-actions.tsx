"use client";

import { DeleteBtn } from "@/shared/components/table/delete-btn";
import { EditLink } from "@/shared/components/table/edit-link";

type RowActionsProps = {
    id: number;
    editHref: string;
    onDelete: () => void;
    isLoading: boolean;
};

export const RowActions = ({ editHref, onDelete, isLoading }: RowActionsProps) => {
    return (
        <div className="flex gap-1">
            <EditLink href={editHref} />
            <DeleteBtn isLoading={isLoading} onDelete={onDelete} />
        </div>
    );
};
