export const knobsKeys = {
    all: ["knobs"] as const,
    lists: () => [...knobsKeys.all, "list"] as const,
    list: (filters: { search?: string; page?: number; limit?: number }) =>
        [...knobsKeys.lists(), filters] as const,
    details: () => [...knobsKeys.all, "detail"] as const,
    detail: (id: number) => [...knobsKeys.details(), id] as const,
};
