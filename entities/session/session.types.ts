/** Ответ GET /auth/session — всё, что бэкенд знает о пользователе. */
export type SessionUser = {
    id: number;
    email: string;
    /** unix timestamp в секундах */
    iat: number;
    /** unix timestamp в секундах */
    exp: number;
};

/** Тело sign-up / sign-in: других полей контракт не принимает. */
export type Credentials = {
    email: string;
    password: string;
};

export type SessionStatus = "unknown" | "authenticated" | "anonymous";

export type SessionState = {
    user: SessionUser | null;
    status: SessionStatus;
};
