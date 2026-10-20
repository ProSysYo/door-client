import { isAxiosError } from "axios";

export type AuthField = "email" | "password";

export type AuthErrorInfo = {
    message: string;
    fields: Partial<Record<AuthField, string>>;
};

const TEXTS = {
    badCredentials: "Неверный email или пароль",
    emailExists: "Пользователь с таким email уже зарегистрирован",
    invalidForm: "Проверьте правильность заполнения формы",
    unavailable: "Сервер недоступен. Попробуйте позже.",
} as const;

const AUTH_FIELDS: readonly string[] = ["email", "password"];

function fieldOf(message: string): AuthField | null {
    const [head] = message.trim().split(" ");
    return AUTH_FIELDS.includes(head) ? (head as AuthField) : null;
}

export function getAuthErrorInfo(error: unknown): AuthErrorInfo {
    if (!isAxiosError(error)) return { message: TEXTS.unavailable, fields: {} };

    if (!error.response) return { message: TEXTS.unavailable, fields: {} };

    const { status, data } = error.response;

    if (status === 401) return { message: TEXTS.badCredentials, fields: {} };

    if (status >= 500) return { message: TEXTS.unavailable, fields: {} };

    const body = data && typeof data === "object" ? (data as Record<string, unknown>) : null;

    if (body?.type === "email-exists") return { message: "", fields: { email: TEXTS.emailExists } };

    const raw = body?.message;
    const messages = (Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : []).filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0,
    );

    if (!messages.length) return { message: TEXTS.invalidForm, fields: {} };

    const fields: Partial<Record<AuthField, string>> = {};
    const rest: string[] = [];

    for (const item of messages) {
        const field = fieldOf(item);
        if (field && !fields[field]) fields[field] = item;
        else rest.push(item);
    }

    const message = rest.length ? rest.join(" ") : Object.keys(fields).length ? "" : TEXTS.invalidForm;

    return { message, fields };
}
