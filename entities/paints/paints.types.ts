export const PAINTS_QUERY_KEY = ["paints"] as const;

export type PaintCreate = {
    name: string;
};

export type Paint = PaintCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
