export const EARS_QUERY_KEY = ["ears"] as const;

export type EarCreate = {
    name: string;
};

export type Ear = EarCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
