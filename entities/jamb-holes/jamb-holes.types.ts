export const JAMB_HOLES_QUERY_KEY = ["jamb-holes"] as const;

export type JambHoleCreate = {
    name: string;
};

export type JambHole = JambHoleCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
