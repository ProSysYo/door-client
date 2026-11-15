import z from "zod";

export const insideFinishFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type InsideFinishFormValues = z.infer<typeof insideFinishFormSchema>;
