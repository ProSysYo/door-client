import z from "zod";

export const hingeFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type HingeFormValues = z.infer<typeof hingeFormSchema>;
