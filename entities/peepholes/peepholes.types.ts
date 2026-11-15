export const PEEPHOLES_QUERY_KEY = ["peepholes"] as const;

export type PeepholeCreate = {
    name: string;
};

export type Peephole = PeepholeCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
