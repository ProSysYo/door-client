import { baseApi } from "@/shared/api/base-api";
import { Order, OrderCreate } from "./orders.types";
import { routes } from "@/config/navigation";

export async function getOrders(): Promise<Order[]> {
    const { data } = await baseApi.get<Order[]>(routes.orders);
    return data;
}

export async function getOrder(id: number): Promise<Order> {
    const { data } = await baseApi.get<Order>(`${routes.orders}/${id}`);
    return data;
}

export async function createOrder(data: OrderCreate): Promise<Order> {
    const { data: created } = await baseApi.post<Order>(routes.orders, data);
    return created;
}

export async function updateOrder(id: number, data: OrderCreate): Promise<Order> {
    const { data: updated } = await baseApi.patch<Order>(`${routes.orders}/${id}`, data);
    return updated;
}

export async function deleteOrder(id: number): Promise<void> {
    await baseApi.delete(`${routes.orders}/${id}`);
}
