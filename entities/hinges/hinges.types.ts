export const HINGES_QUERY_KEY = ["hinges"] as const;

export type HingeCreate = {
    name: string;
};

export type Hinge = HingeCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
