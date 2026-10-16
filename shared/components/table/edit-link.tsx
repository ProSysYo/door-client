import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "../shadcn/button";

type Props = {
    href: string;
};

export const EditLink = ({ href }: Props) => {
    return (
        <Link href={href}>
            <Button
                type="button"
                size="sm"
                variant="ghost"
                aria-label="Редактировать"
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
            >
                <Edit className="h-4 w-4" />
            </Button>
        </Link>
    );
};