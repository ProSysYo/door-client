"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationShade,
} from "../shadcn/pagination";

type Props = {
    totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        const newURL = `${pathname}?${params.toString()}`;

        router.push(newURL);
    };

    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <PaginationShade className="justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        text="Назад"
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                </PaginationItem>

                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        text="Вперед"
                        className={currentPage === pages.length ? "pointer-events-none opacity-50" : ""}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationShade>
    );
};
