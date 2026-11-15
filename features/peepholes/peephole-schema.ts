import z from "zod";

export const peepholeFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type PeepholeFormValues = z.infer<typeof peepholeFormSchema>;
