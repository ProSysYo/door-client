import z from "zod";

export const customerFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
    code: z.string().trim().min(3, "Минимум 3 символа"),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
