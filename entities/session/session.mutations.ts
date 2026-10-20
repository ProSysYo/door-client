import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { getSession, signIn, signUp, signOut } from "./session.api";
import type { Credentials } from "./session.types";

export function useSignIn() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials: Credentials) => {
            await signIn(credentials);
            return getSession();
        },
        onSuccess: (user) => queryClient.setQueryData(["session", "current"], user),
    });
}

export function useSignUp() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials: Credentials) => {
            await signUp(credentials);
            return getSession();
        },
        onSuccess: (user) => queryClient.setQueryData(["session", "current"], user),
    });
}

export function useSignOut() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            try {
                await signOut();
            } catch (error) {
                if (!isAxiosError(error) || error.response?.status !== 401) throw error;
            }
            return null;
        },
        onSettled: () => queryClient.setQueryData(["session", "current"], null),
    });
}
