export const PADS_QUERY_KEY = ["pads"] as const;

export type PadCreate = {
    name: string;
};

export type Pad = PadCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
