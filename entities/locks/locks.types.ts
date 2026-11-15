export const LOCKS_QUERY_KEY = ["locks"] as const;

export type LockCreate = {
    name: string;
};

export type Lock = LockCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
