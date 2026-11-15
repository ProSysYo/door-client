export const BOLTS_QUERY_KEY = ["bolts"] as const;

export type BoltCreate = {
    name: string;
};

export type Bolt = BoltCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
