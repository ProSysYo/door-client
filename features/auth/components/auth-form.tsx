"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routes } from "@/config/navigation";
import { useSignIn, useSignUp } from "@/entities/session/session.mutations";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";
import { getAuthErrorInfo, type AuthField } from "../model/auth-errors";
import { validateCredentials, type AuthFieldErrors } from "../model/auth-schema";

type AuthFormProps = {
    mode: "sign-in" | "sign-up";
    submitLabel: string;
    title: string;
    description: string;
    footer: ReactNode;
};

/** Форма входа и регистрации: отличаются только мутацией, тексты и ссылка внизу. */
export const AuthForm = ({ mode, submitLabel, title, description, footer }: AuthFormProps) => {
    const router = useRouter();
    const signIn = useSignIn();
    const signUp = useSignUp();
    const mutation = mode === "sign-up" ? signUp : signIn;

    const [values, setValues] = useState({ email: "test@gmail2.com", password: "recdfss" });
    const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
    const [formError, setFormError] = useState("");

    const setField = (field: AuthField, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        setFormError("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { data, errors } = validateCredentials(values);
        if (!data) {
            setFieldErrors(errors);
            setFormError("");
            return;
        }

        setFieldErrors({});
        setFormError("");

        try {
            await mutation.mutateAsync(data);
            router.replace(routes.home);
        } catch (error) {
            const info = getAuthErrorInfo(error);
            setFieldErrors(info.fields);
            setFormError(info.message);
        }
    };

    return (
        <div className="w-full max-w-sm space-y-6">
            <div className="space-y-1 text-center">
                <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm" noValidate>
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.ru"
                    value={values.email}
                    error={fieldErrors.email}
                    onChange={(event) => setField("email", event.target.value)}
                />
                <InputField
                    id="password"
                    label="Пароль"
                    type="password"
                    autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                    placeholder="Пароль"
                    value={values.password}
                    error={fieldErrors.password}
                    onChange={(event) => setField("password", event.target.value)}
                />

                {formError && (
                    <p role="alert" className="text-sm text-destructive">
                        {formError}
                    </p>
                )}

                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Подождите..." : submitLabel}
                </Button>

                {footer}
            </form>
        </div>
    );
};

/** Ссылка между входом и регистрацией. */
export const AuthSwitchLink = ({ href, text }: { href: string; text: string }) => (
    <p className="text-center text-sm text-muted-foreground">
        <Link href={href} className="font-medium underline-offset-4 hover:underline">
            {text}
        </Link>
    </p>
);
