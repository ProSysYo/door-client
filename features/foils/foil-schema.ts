import z from "zod";

export const foilFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type FoilFormValues = z.infer<typeof foilFormSchema>;
