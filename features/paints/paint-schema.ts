import z from "zod";

export const paintFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type PaintFormValues = z.infer<typeof paintFormSchema>;