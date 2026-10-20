import z from "zod";
import type { AuthField } from "./auth-errors";

export const credentialsSchema = z.object({
    email: z.string().trim().pipe(z.email("Введите корректный email")),
    password: z.string().trim().min(1, "Введите пароль"),
});

export type CredentialsFormValues = z.infer<typeof credentialsSchema>;

export type AuthFieldErrors = Partial<Record<AuthField, string>>;

export function validateCredentials(values: { email: string; password: string }): {
    data: CredentialsFormValues | null;
    errors: AuthFieldErrors;
} {
    const result = credentialsSchema.safeParse(values);

    if (result.success) return { data: result.data, errors: {} };

    const errors: AuthFieldErrors = {};
    for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") {
            errors[key as AuthField] ??= issue.message;
        }
    }

    return { data: null, errors };
}
