"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "../shadcn/button";

type Props = {
    isLoading: boolean;
    onDelete: () => void;
};

export const DeleteBtn = ({ isLoading, onDelete }: Props) => {
    return (
        <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={isLoading}
            onClick={onDelete}
            aria-label="Удалить"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
        </Button>
    );
};