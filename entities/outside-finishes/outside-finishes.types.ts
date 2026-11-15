export const OUTSIDE_FINISHES_QUERY_KEY = ["outside-finishes"] as const;

export type OutsideFinishCreate = {
    name: string;
};

export type OutsideFinish = OutsideFinishCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
