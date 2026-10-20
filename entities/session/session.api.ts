import { baseApi } from "@/shared/api/base-api";
import type { Credentials, SessionUser } from "./session.types";

export async function getSession(): Promise<SessionUser> {
    const { data } = await baseApi.get<SessionUser>("/auth/session");
    return data;
}

export async function signIn(credentials: Credentials): Promise<void> {
    await baseApi.post("/auth/sign-in", credentials);
}

export async function signUp(credentials: Credentials): Promise<void> {
    await baseApi.post("/auth/sign-up", credentials);
}

export async function signOut(): Promise<void> {
    await baseApi.post("/auth/sign-out");
}
