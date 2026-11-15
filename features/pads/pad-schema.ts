import z from "zod";

export const padFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type PadFormValues = z.infer<typeof padFormSchema>;
