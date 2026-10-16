import z from "zod";

export const knobFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type KnobFormValues = z.infer<typeof knobFormSchema>;
