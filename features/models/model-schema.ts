import z from "zod";

export const modelFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type ModelFormValues = z.infer<typeof modelFormSchema>;
