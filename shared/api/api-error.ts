import { isAxiosError } from "axios";

const FALLBACK_MESSAGE = "Не удалось сохранить данные. Попробуйте ещё раз.";
const NETWORK_MESSAGE = "Сервер недоступен. Проверьте соединение.";

export interface ApiErrorInfo<K extends string> {
    fields: Partial<Record<K, string>>;
    message: string;
    status?: number;
}

function firstMessage(value: unknown): string | null {
    if (typeof value === "string") return value.trim() ? value : null;
    if (Array.isArray(value)) {
        for (const item of value) {
            const nested = firstMessage(item);
            if (nested) return nested;
        }
    }
    return null;
}

function collectFieldEntries(raw: unknown): Record<string, string> {
    const entries: Record<string, string> = {};

    if (Array.isArray(raw)) {
        for (const item of raw) {
            if (!item || typeof item !== "object") continue;
            const { field, path, message } = item as { field?: unknown; path?: unknown; message?: unknown };
            const key = typeof field === "string" ? field : typeof path === "string" ? path : null;
            const text = firstMessage(message);
            if (key && text && !(key in entries)) entries[key] = text;
        }
        return entries;
    }

    if (raw && typeof raw === "object") {
        for (const [key, value] of Object.entries(raw)) {
            const text = firstMessage(value);
            if (text && !(key in entries)) entries[key] = text;
        }
    }

    return entries;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Нормализует ошибку axios в формат удобный для отображения в форме.
 * Сообщения полей отсутствующих в `fieldNames` попадают в `message`.
 */
export function getApiErrorInfo<K extends string>(error: unknown, fieldNames: readonly K[]): ApiErrorInfo<K> {
    if (!isAxiosError(error)) {
        return { fields: {}, message: FALLBACK_MESSAGE };
    }

    const status: number | undefined = error.response?.status;

    if (!error.response) {
        return { fields: {}, message: NETWORK_MESSAGE, status };
    }

    const payload = isPlainObject(error.response?.data) ? error.response.data : null;

    const fromWrapper = collectFieldEntries(payload?.errors);
    const fromRoot: Record<string, string> = {};
    if (payload) {
        for (const name of fieldNames) {
            const text = firstMessage(payload[name]);
            if (text) fromRoot[name] = text;
        }
    }
    const collected = { ...fromRoot, ...fromWrapper };

    const fields: Partial<Record<K, string>> = {};
    const unmapped: string[] = [];

    for (const [key, text] of Object.entries(collected)) {
        if ((fieldNames as readonly string[]).includes(key)) {
            fields[key as K] = text;
        } else {
            unmapped.push(text);
        }
    }

    let message: string;
    if (unmapped.length) {
        message = unmapped.join(" ");
    } else if (Object.keys(fields).length) {
        message = "";
    } else {
        message = firstMessage(payload?.message) ?? firstMessage(payload?.error) ?? FALLBACK_MESSAGE;
    }

    return { fields, message, status };
}
