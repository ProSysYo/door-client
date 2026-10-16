export type KnobCreate = {
    name: string;
};

export type Knob = KnobCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};

export type KnobFilters = {
    search?: string;
    page?: number;
    limit?: number;
};

export type KnobsResponse = {
    items: Knob[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
