import z from "zod";

const positiveNumberString = (requiredMessage: string) =>
    z
        .string()
        .trim()
        .min(1, requiredMessage)
        .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, "Значение должно быть больше 0");

export const orderFormSchema = z
    .object({
        // Заказ
        customerCode: z.string().min(1, "Выберите заказчика"),
        orderDate: z.string().min(1, "Укажите дату оформления"),
        doorsCount: z
            .string()
            .trim()
            .min(1, "Укажите количество дверей")
            .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 1, "Минимум 1 дверь"),
        note: z.string().trim().max(420, "Не более 420 символов"),

        // Конструктив
        model: z.string().min(1, "Выберите модель полотна"), // Модель полотна
        frameModel: z.string().min(1, "Выберите модель коробки"), // Модель коробки
        leafThickness: z.string().trim().min(1, "Выберите толщину полотна"), // Толщина полотна
        height: positiveNumberString("Укажите высоту"), // Высота
        width: positiveNumberString("Укажите ширину"), // Ширина
        leafWidth: z
            .string()
            .trim()
            .refine(
                (value) => value === "" || (Number.isFinite(Number(value)) && Number(value) > 0),
                "Должно быть положительным числом",
            ), // Ширина рабочей створки
        leafMetalThickness: z.string().trim().min(1, "Укажите толщину металла полотна"), // Толщина металла полотна
        frameMetalThickness: z.string().trim().min(1, "Укажите толщину металла короба"), // Толщина металла короба
        jambHole: z.string().trim().min(1, "Укажите отверстия в коробе"), // Отверстия в коробе
        ear: z.string().trim().min(1, "Укажите уши"), // Уши
        hinge: z.string().trim().min(1, "Укажите петли"), // Петли
        hingeSide: z.string().trim().min(1, "Укажите сторонность петель"), // Сторонность петель
        hingeCount3: z.boolean(), // 3 петли

        // Замки и фурнитура
        mainLock: z.string().min(1, "Выберите основной замок"), // Осн замок
        mainPad: z.string().trim().min(1, "Выберите накладки основного замка"), // Накладки осн замка
        knob: z.string().trim().min(1, "Выберите ручки"), // Ручки
        bolt: z.string().trim().min(1, "Выберите засов"), // Засов
        mainLockCylinder: z.string().trim().min(1, "Выберите цилиндр основного замка"), // Цилиндр основного замка
        extraLock: z.string().trim().min(1, "Выберите дополнительный замок"), // Дополнительный замок
        extraPad: z.string().trim().min(1, "Выберите накладки доп. замка"), // Накладки доп замка
        extraLockCylinder: z.string().trim().min(1, "Выберите цилиндр доп замка"), // Цилиндр доп замка

        // Покраска
        paint: z.string().trim().min(1, "Выберите покраску"), // Покраска

        // Отделка снаружи
        outsideFinish: z.string().trim().min(1, "Выберите отделку снаружи"), // Отделка снаружи
        outsideFoil: z.string().trim().min(1, "Выберите плёнку снаружи"), // Пленка снаружи

        // Отделка внутри
        insideFinish: z.string().trim().min(1, "Выберите отделку внутри"), // Отделка внутри
        insideFoil: z.string().trim().min(1, "Выберите плёнку внутри"), // Пленка внутри

        // Наличник
        casingFoil: z.string().trim().min(1, "Выберите плёнку наличника"), // Пленка наличника

        // Дополнительные элементы
        streetDoor: z.boolean(), // Уличная дверь
        eccentric: z.boolean(), // эксцентрик
        backSheet: z.boolean(), // задний лист
        thermalCable: z.boolean(), // Термокабель
        closerReinforcement: z.boolean(), // Усиление под доводчик
        closer: z.boolean(), // Доводчик
        electromagnet: z.boolean(), // Электромагнит
        lighting: z.boolean(), // Подсветка
        soundproofing: z.boolean(), // Шумоизоляция

        // Упаковка и стоимость
        packaging: z.string().trim().min(1, "Выберите упаковку"),
        price: z.string().trim().min(1, "Укажите стоимость"),
    })
    .refine((val) => !/^д/i.test(val.model.trim()) || val.leafWidth.trim() !== "", {
        error: "Укажите ширину рабочей створки",
        path: ["leafWidth"],
    })
    .refine(
        (val) => {
            if (val.leafWidth.trim() === "" || val.width.trim() === "") return true;
            const leaf = Number(val.leafWidth);
            const width = Number(val.width);
            if (!Number.isFinite(leaf) || !Number.isFinite(width)) return true;
            return leaf < width;
        },
        {
            error: "Ширина рабочей створки превышена",
            path: ["leafWidth"],
        },
    );

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export function createEmptyOrderFormValues(): OrderFormValues {
    const empty = Object.fromEntries(
        Object.entries(orderFormSchema.shape).map(([key, field]) => [key, field.def.type === "boolean" ? false : ""]),
    );

    return empty as OrderFormValues;
}
