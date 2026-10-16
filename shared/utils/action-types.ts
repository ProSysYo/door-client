export type ActionResult<T> = {
    data?: T;
    error?: string;
    errors?: Record<string, string>;
};
