import type { AxiosInstance } from "axios";
import { Credentials, SessionUser } from "./session.types";

export class SessionApi {
    constructor(private readonly axios: AxiosInstance) {}

    /**
     * Единственная точка, где клиент узнаёт, залогинен ли пользователь.
     * 401 бросает ошибку — штатный ответ для гостя.
     */
    async getSession(): Promise<SessionUser> {
        const { data } = await this.axios.get<SessionUser>("/auth/session");
        return data;
    }

    /** Тело ответа пустое: пользователь опознаётся по проставленной куке. */
    async signIn(credentials: Credentials): Promise<void> {
        await this.axios.post("/auth/sign-in", credentials);
    }

    /** Тело ответа пустое, кука проставлена — пользователь сразу залогинен. */
    async signUp(credentials: Credentials): Promise<void> {
        await this.axios.post("/auth/sign-up", credentials);
    }

    /** Не идемпотентен: без валидной куки вернёт 401. */
    async signOut(): Promise<void> {
        await this.axios.post("/auth/sign-out");
    }
}
