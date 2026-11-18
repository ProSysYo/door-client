import type { Order } from "@/entities/orders/orders.types";
import type { OrderFormSources, OrderFormOptions, SelectOption } from "./order-types";
import type { OrderFormValues } from "./order-schema";

const byName = <T extends { name: string }>(items: T[]): SelectOption[] =>
    items.map((item) => ({ value: item.name, label: item.name }));

export function mapOrderOptions(sources: OrderFormSources): OrderFormOptions {
    return {
        customers: sources.customers.map((customer) => ({
            value: customer.code,
            label: customer.name,
        })),
        models: byName(sources.models),
        locks: byName(sources.locks),
        pads: byName(sources.pads),
        knobs: byName(sources.knobs),
        bolts: byName(sources.bolts),
        paints: byName(sources.paints),
        ears: byName(sources.ears),
        packagings: byName(sources.packagings),
        jambHoles: byName(sources.jambHoles),
        hinges: byName(sources.hinges),
        foils: byName(sources.foils),
        outsideFinishes: byName(sources.outsideFinishes),
        insideFinishes: byName(sources.insideFinishes),
    };
}

const ORDER_SERVICE_FIELDS = ["id", "createdAt", "updatedAt"] as const;

export function toOrderFormValues(order: Order): OrderFormValues {
    const entries = Object.entries(order).filter(([key]) => !(ORDER_SERVICE_FIELDS as readonly string[]).includes(key));
    return Object.fromEntries(entries) as OrderFormValues;
}
