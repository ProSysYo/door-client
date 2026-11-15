import z from "zod";

export const jambHoleFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type JambHoleFormValues = z.infer<typeof jambHoleFormSchema>;
