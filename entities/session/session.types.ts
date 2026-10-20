export type SessionUser = {
    id: number;
    email: string;
    iat: number;
    exp: number;
};

export type Credentials = {
    email: string;
    password: string;
};

export type SessionStatus = "unknown" | "authenticated" | "anonymous";

export type SessionState = {
    user: SessionUser | null;
    status: SessionStatus;
};
