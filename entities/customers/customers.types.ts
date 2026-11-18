export const CUSTOMERS_QUERY_KEY = ["customers"] as const;

export type CustomerCreate = {
    name: string;
    code: string;
};

export type Customer = CustomerCreate & {
    id: number;
    createdAt: string;
    updatedAt: string;
};
