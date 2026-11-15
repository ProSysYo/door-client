export const INSIDE_FINISHES_QUERY_KEY = ["inside-finishes"] as const;

export type InsideFinishCreate = {
    name: string;
};

export type InsideFinish = InsideFinishCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
