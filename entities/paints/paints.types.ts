export type PaintCreate = {
    name: string;
};

export type Paint = PaintCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
