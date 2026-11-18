"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Boxes,
    Coins,
    DoorOpen,
    KeyRound,
    Layers,
    Paintbrush,
    Package,
    Ruler,
    Sparkles,
    StickyNote,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/shadcn/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/shadcn/field";
import { Textarea } from "@/shared/components/shadcn/textarea";
import { InputField } from "@/shared/components/input-field";
import { ComboboxField } from "@/shared/components/combobox-field";
import { Section } from "@/shared/components/section";
import { FlagField } from "@/shared/components/flag-field";
import { ChoiceField } from "@/shared/components/choice-field";
import { parseZodErrors } from "@/shared/utils/zod-utils";
import { getApiErrorInfo } from "@/shared/api/api-error";
import { useCreateOrder, useUpdateOrder } from "@/entities/orders/orders.mutations";
import { mapOrderOptions } from "../order-helpers";
import { createEmptyOrderFormValues, orderFormSchema, type OrderFormValues } from "../order-schema";
import type { OrderFormSources, SelectOption } from "../order-types";

const cylinders: SelectOption[] = [
    { value: "нет", label: "нет" },
    { value: "к/к", label: "к/к" },
    { value: "к/в", label: "к/в" },
];

interface OrderFormProps {
    sources: OrderFormSources;
    editId?: number;
    initialValues?: Partial<OrderFormValues> | null;
    onSuccess?: () => void;
}

export const OrderForm = ({ sources, editId, initialValues, onSuccess }: OrderFormProps) => {
    const router = useRouter();
    const isEdit = !!editId;

    const createOrder = useCreateOrder();
    const updateOrder = useUpdateOrder();

    const items = React.useMemo(() => mapOrderOptions(sources), [sources]);

    const [values, setValues] = React.useState<OrderFormValues>(() => ({
        ...createEmptyOrderFormValues(),
        ...initialValues,
    }));
    const [errors, setErrors] = React.useState<Partial<Record<keyof OrderFormValues, string>>>({});

    const setField = <K extends keyof OrderFormValues>(field: K, value: OrderFormValues[K]) => {
        if (field === "model" && values.model !== "") {
            setValues((prev) => ({ ...prev, [field]: value, leafWidth: "" }));
            setErrors((prev) => ({ ...prev, [field]: undefined, leafWidth: undefined }));
            toast.warning("Изменилась модель полотна, зависимые поля были сброшены");
            return;
        }
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const isPending = createOrder.isPending || updateOrder.isPending;

    const handleSubmit = async () => {
        const result = orderFormSchema.safeParse(values);
        if (!result.success) {
            setErrors(parseZodErrors(result.error) as Partial<Record<keyof OrderFormValues, string>>);
            toast.error("Проверьте правильность заполнения формы");
            return;
        }

        setErrors({});

        try {
            if (isEdit && editId) {
                await updateOrder.mutateAsync({ id: editId, data: result.data });
                toast.success("Заказ обновлён");
            } else {
                await createOrder.mutateAsync(result.data);
                toast.success("Заказ создан");
            }
            onSuccess?.();
        } catch (error) {
            const { fields, message } = getApiErrorInfo(error, Object.keys(values) as (keyof OrderFormValues)[]);
            setErrors(fields);
            if (message) toast.error(message);
        }
    };

    const selectField = (
        id: keyof OrderFormValues,
        label: string,
        fieldItems: SelectOption[],
        opts?: { placeholder?: string; required?: boolean; emptyText?: string },
    ) => (
        <ComboboxField
            id={id}
            label={label}
            placeholder={opts?.placeholder ?? "Выберите значение"}
            emptyText={opts?.emptyText ?? "Справочник не заполнен"}
            items={fieldItems}
            value={values[id] as string}
            onValueChange={(v) => setField(id, v as OrderFormValues[typeof id])}
            error={errors[id]}
            required={opts?.required}
        />
    );

    return (
        <div className="flex flex-col gap-6 pb-16">
            {/* Заказ */}
            <Section title="Заказ" icon={StickyNote} description="Основные данные по заказу">
                {selectField("customerCode", "Заказчик", items.customers, {
                    placeholder: "Выберите заказчика",
                    required: true,
                })}
                <InputField
                    id="orderDate"
                    label="Дата оформления"
                    type="date"
                    value={values.orderDate}
                    error={errors.orderDate}
                    onChange={(e) => setField("orderDate", e.target.value)}
                />
                <InputField
                    id="doorsCount"
                    label="Количество дверей"
                    type="number"
                    min={1}
                    placeholder="1"
                    value={values.doorsCount}
                    error={errors.doorsCount}
                    onChange={(e) => setField("doorsCount", e.target.value)}
                />
                <Field data-invalid={!!errors.note}>
                    <FieldLabel htmlFor="note">Примечание</FieldLabel>
                    <Textarea
                        id="note"
                        placeholder="Ограничение — 420 символов"
                        maxLength={420}
                        value={values.note}
                        aria-invalid={!!errors.note}
                        onChange={(e) => setField("note", e.target.value)}
                    />
                    {errors.note && <FieldError>{errors.note}</FieldError>}
                </Field>
            </Section>

            {/* Конструктив */}
            <Section title="Конструктив" icon={Ruler} description="Модель, габариты, тип открывания, петли, металл">
                {selectField("model", "Модель полотна", items.models, {
                    placeholder: "Выберите модель",
                    required: true,
                })}
                <ChoiceField
                    label="Толщина полотна, мм"
                    options={["60", "70", "80", "90", "100"]}
                    value={values.leafThickness}
                    onValueChange={(v) => setField("leafThickness", v)}
                    error={errors.leafThickness}
                />
                <InputField
                    id="height"
                    label="Высота двери, мм"
                    type="number"
                    placeholder="2000"
                    value={values.height}
                    error={errors.height}
                    onChange={(e) => setField("height", e.target.value)}
                />
                <InputField
                    id="width"
                    label="Ширина двери, мм"
                    type="number"
                    placeholder="900"
                    value={values.width}
                    error={errors.width}
                    onChange={(e) => setField("width", e.target.value)}
                />
                <InputField
                    id="leafWidth"
                    label="Ширина раб. створки, мм"
                    type="number"
                    placeholder=""
                    className="w-60"
                    value={values.leafWidth}
                    error={errors.leafWidth}
                    disabled={!/^д/i.test(values.model.trim())}
                    onChange={(e) => setField("leafWidth", e.target.value)}
                />
                <ChoiceField
                    label="Толщина металла полотна, мм"
                    options={["1", "1.2", "1.4"]}
                    value={values.leafMetalThickness}
                    onValueChange={(v) => setField("leafMetalThickness", v)}
                    error={errors.leafMetalThickness}
                />
                <ChoiceField
                    label="Толщина металла коробки, мм"
                    options={["1.2", "1.4"]}
                    value={values.frameMetalThickness}
                    onValueChange={(v) => setField("frameMetalThickness", v)}
                    error={errors.frameMetalThickness}
                />
                <ChoiceField
                    label="Модель коробки"
                    options={["Открытая", "Закрытая", "Утеплённая"]}
                    value={values.frameModel}
                    onValueChange={(v) => setField("frameModel", v)}
                    error={errors.frameModel}
                />
                {selectField("jambHole", "Отверстия в коробке", items.jambHoles, {
                    placeholder: "Выберите отверстия",
                })}
                {selectField("ear", "Уши", items.ears, { placeholder: "Выберите уши" })}
                {selectField("hinge", "Петли", items.hinges, { placeholder: "Выберите петли" })}
                <ChoiceField
                    label="Сторонность петель"
                    options={["Левые", "Правые"]}
                    value={values.hingeSide}
                    onValueChange={(v) => setField("hingeSide", v)}
                    error={errors.hingeSide}
                />
                <FlagField
                    label="Три петли"
                    checked={values.hingeCount3}
                    onCheckedChange={(v) => setField("hingeCount3", v)}
                />
            </Section>

            {/* Замки и фурнитура */}
            <Section
                title="Замки и фурнитура"
                icon={KeyRound}
                description="Основной и дополнительный замок, ручки, накладки"
            >
                {selectField("mainLock", "Тип осн. замка", items.locks, {
                    placeholder: "Выберите замок",
                    required: true,
                })}
                {selectField("mainPad", "Накладки осн. замка", items.pads, {
                    placeholder: "Выберите накладки",
                })}
                {selectField("knob", "Ручка", items.knobs, { placeholder: "Выберите ручку" })}
                {selectField("bolt", "Засов", items.bolts, { placeholder: "Выберите засов" })}
                {selectField("mainLockCylinder", "Цилиндр осн. замка", cylinders, {
                    placeholder: "Выберите цилиндр",
                    required: true,
                })}
                {selectField("extraLock", "Тип доп. замка", items.locks, {
                    placeholder: "Выберите замок",
                })}
                {selectField("extraPad", "Накладки доп. замка", items.pads, {
                    placeholder: "Выберите накладки",
                })}
                {selectField("extraLockCylinder", "Цилиндр доп. замка", cylinders, {
                    placeholder: "Выберите цилиндр",
                    required: true,
                })}
            </Section>

            {/* Покраска */}
            <Section title="Покраска" icon={Paintbrush}>
                {selectField("paint", "Цвет покраски", items.paints, { placeholder: "Выберите цвет" })}
            </Section>

            {/* Отделка снаружи */}
            <Section title="Отделка снаружи" icon={Layers} description="Наружная панель, плёнка и патина">
                {selectField("outsideFinish", "Отделка снаружи", items.outsideFinishes, {
                    placeholder: "Выберите отделку",
                })}
                {selectField("outsideFoil", "Цвет плёнки (снаружи)", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            {/* Отделка внутри */}
            <Section title="Отделка внутри" icon={Layers} description="Внутренняя панель, плёнка и патина">
                {selectField("insideFinish", "Отделка внутри", items.insideFinishes, {
                    placeholder: "Выберите отделку",
                })}
                {selectField("insideFoil", "Цвет плёнки (внутри)", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            {/* Наличник */}
            <Section title="Наличник" icon={Boxes}>
                {selectField("casingFoil", "Цвет плёнки наличника", items.foils, {
                    placeholder: "Выберите плёнку",
                })}
            </Section>

            {/* Дополнительные элементы */}
            <Section title="Дополнительные элементы" icon={Sparkles} description="Опции и оснащение двери">
                <FlagField
                    label="Уличная дверь"
                    checked={values.streetDoor}
                    onCheckedChange={(v) => setField("streetDoor", v)}
                />
                <FlagField
                    label="Эксцентрик"
                    checked={values.eccentric}
                    onCheckedChange={(v) => setField("eccentric", v)}
                />
                <FlagField
                    label="Задний лист"
                    checked={values.backSheet}
                    onCheckedChange={(v) => setField("backSheet", v)}
                />
                <FlagField
                    label="Термокабель"
                    checked={values.thermalCable}
                    onCheckedChange={(v) => setField("thermalCable", v)}
                />
                <FlagField
                    label="Усиление под доводчик"
                    checked={values.closerReinforcement}
                    onCheckedChange={(v) => setField("closerReinforcement", v)}
                />
                <FlagField label="Доводчик" checked={values.closer} onCheckedChange={(v) => setField("closer", v)} />
                <FlagField
                    label="Электромагнит"
                    checked={values.electromagnet}
                    onCheckedChange={(v) => setField("electromagnet", v)}
                />
                <FlagField
                    label="Подсветка"
                    checked={values.lighting}
                    onCheckedChange={(v) => setField("lighting", v)}
                />
                <FlagField
                    label="Шумоизоляция"
                    checked={values.soundproofing}
                    onCheckedChange={(v) => setField("soundproofing", v)}
                />
            </Section>

            {/* Упаковка и стоимость */}
            <Section title="Упаковка и стоимость" icon={Package}>
                {selectField("packaging", "Тип упаковки", items.packagings, {
                    placeholder: "Выберите упаковку",
                })}
                <InputField
                    id="price"
                    label="Стоимость, ₽"
                    type="number"
                    placeholder="0"
                    value={values.price}
                    error={errors.price}
                    onChange={(e) => setField("price", e.target.value)}
                />
            </Section>

            <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 rounded-xl border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Coins className="size-4" />
                    <span>Стоимость: {values.price ? `${values.price} ₽` : "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" disabled={isPending} onClick={() => router.back()}>
                        Отмена
                    </Button>
                    <Button type="button" disabled={isPending} onClick={handleSubmit}>
                        <DoorOpen className="size-4" />
                        {isPending ? "Сохранение..." : isEdit ? "Сохранить" : "Создать заказ"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
