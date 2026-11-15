import z from "zod";

export const earFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type EarFormValues = z.infer<typeof earFormSchema>;
