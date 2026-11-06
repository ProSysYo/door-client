export const KNOBS_QUERY_KEY = ["knobs"] as const;

export type KnobCreate = {
    name: string;
};

export type Knob = KnobCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
