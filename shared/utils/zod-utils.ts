import { ZodError } from "zod";

export function parseZodErrors(error: ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
        const path = issue.path[0] as string | undefined;
        if (path) {
            fieldErrors[path] = issue.message;
        }
    }
    return fieldErrors;
}

export function getFirstZodError(error: ZodError): string {
    const fieldErrors = parseZodErrors(error);
    return Object.values(fieldErrors)[0] || "Ошибка валидации";
}