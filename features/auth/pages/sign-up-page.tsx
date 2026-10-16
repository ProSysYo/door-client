"use client";

import { routes } from "@/config/navigation";
import { AuthForm, AuthSwitchLink } from "../components/auth-form";

export const SignUpPage = () => (
    <AuthForm
        mode="sign-up"
        title="Регистрация"
        description="После регистрации вы сразу попадёте в систему"
        submitLabel="Создать аккаунт"
        footer={<AuthSwitchLink href={routes.login} text="Уже есть аккаунт? Войти" />}
    />
);
