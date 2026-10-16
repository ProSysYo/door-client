"use client";

import { routes } from "@/config/navigation";
import { AuthForm, AuthSwitchLink } from "../components/auth-form";

export const SignInPage = () => (
    <AuthForm
        mode="sign-in"
        title="Вход в систему"
        description="Управление производством железных дверей"
        submitLabel="Войти"
        footer={<AuthSwitchLink href={routes.register} text="Нет аккаунта? Зарегистрироваться" />}
    />
);
