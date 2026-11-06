import { baseApi } from "@/shared/api/base-api";
import { PackagingCreate, Packaging } from "./packagings.types";
import { routes } from "@/config/navigation";

export async function getPackagings(): Promise<Packaging[]> {
    const { data } = await baseApi.get<Packaging[]>(routes.packagings);
    return data;
}

export async function getPackaging(id: number): Promise<Packaging> {
    const { data } = await baseApi.get<Packaging>(`${routes.packagings}/${id}`);
    return data;
}

export async function createPackaging(data: PackagingCreate): Promise<Packaging> {
    const { data: created } = await baseApi.post<Packaging>(routes.packagings, data);
    return created;
}

export async function updatePackaging(id: number, data: PackagingCreate): Promise<Packaging> {
    const { data: updated } = await baseApi.patch<Packaging>(`${routes.packagings}/${id}`, data);
    return updated;
}

export async function deletePackaging(id: number): Promise<void> {
    await baseApi.delete(`${routes.packagings}/${id}`);
}
