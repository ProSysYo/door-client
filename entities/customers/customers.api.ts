import { baseApi } from "@/shared/api/base-api";
import { Customer, CustomerCreate } from "./customers.types";
import { routes } from "@/config/navigation";

export async function getCustomers(): Promise<Customer[]> {
    const { data } = await baseApi.get<Customer[]>(routes.customers);
    return data;
}

export async function getCustomer(id: number): Promise<Customer> {
    const { data } = await baseApi.get<Customer>(`${routes.customers}/${id}`);
    return data;
}

export async function createCustomer(data: CustomerCreate): Promise<Customer> {
    const { data: created } = await baseApi.post<Customer>(routes.customers, data);
    return created;
}

export async function updateCustomer(id: number, data: CustomerCreate): Promise<Customer> {
    const { data: updated } = await baseApi.patch<Customer>(`${routes.customers}/${id}`, data);
    return updated;
}

export async function deleteCustomer(id: number): Promise<void> {
    await baseApi.delete(`${routes.customers}/${id}`);
}
