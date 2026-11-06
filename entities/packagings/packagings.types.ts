export const PACKAGINGS_QUERY_KEY = ["packagings"] as const;

export type PackagingCreate = {
    name: string;
};

export type Packaging = PackagingCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
