import z from "zod";

export const packagingFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type PackagingFormValues = z.infer<typeof packagingFormSchema>;
