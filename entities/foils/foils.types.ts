export const FOILS_QUERY_KEY = ["foils"] as const;

export type FoilCreate = {
    name: string;
};

export type Foil = FoilCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
