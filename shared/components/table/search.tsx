"use client";
import { useDebouncedCallback } from "@/shared/hooks/use-debounced-callback";

import { Search as SearchLucide } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../shadcn/input-group";

type Props = {
    placeholder: string;
};

export const Search = ({ placeholder }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("query") || "";

    const [searchTerm, setSearchTerm] = useState(query);

    const updateSearchURL = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("page", "1");

            if (term) {
                params.set("query", term);
            } else {
                params.delete("query");
            }

            const newURL = `${pathname}?${params.toString()}`;
            router.replace(newURL);
        },
        [pathname, router, searchParams],
    );

    const debouncedUpdateURL = useDebouncedCallback(updateSearchURL as (...args: unknown[]) => void, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        debouncedUpdateURL(e.target.value);
    };

    return (
        <InputGroup className="max-w-70">
            <InputGroupAddon>
                <SearchLucide className="w-4 h-4" />
            </InputGroupAddon>

            <InputGroupInput placeholder={placeholder} value={searchTerm} onChange={handleSearchChange} />
        </InputGroup>
    );
};
