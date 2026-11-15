import z from "zod";

export const boltFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type BoltFormValues = z.infer<typeof boltFormSchema>;
