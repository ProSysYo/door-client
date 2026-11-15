import z from "zod";

export const outsideFinishFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type OutsideFinishFormValues = z.infer<typeof outsideFinishFormSchema>;
