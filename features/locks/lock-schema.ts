import z from "zod";

export const lockFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type LockFormValues = z.infer<typeof lockFormSchema>;
