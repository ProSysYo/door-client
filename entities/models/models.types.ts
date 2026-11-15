export const MODELS_QUERY_KEY = ["models"] as const;

export type ModelCreate = {
    name: string;
};

export type Model = ModelCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
