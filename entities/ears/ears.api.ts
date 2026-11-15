import { baseApi } from "@/shared/api/base-api";
import { Ear, EarCreate } from "./ears.types";
import { routes } from "@/config/navigation";

export async function getEars(): Promise<Ear[]> {
    const { data } = await baseApi.get<Ear[]>(routes.ears);
    return data;
}

export async function getEar(id: number): Promise<Ear> {
    const { data } = await baseApi.get<Ear>(`${routes.ears}/${id}`);
    return data;
}

export async function createEar(data: EarCreate): Promise<Ear> {
    const { data: created } = await baseApi.post<Ear>(routes.ears, data);
    return created;
}

export async function updateEar(id: number, data: EarCreate): Promise<Ear> {
    const { data: updated } = await baseApi.patch<Ear>(`${routes.ears}/${id}`, data);
    return updated;
}

export async function deleteEar(id: number): Promise<void> {
    await baseApi.delete(`${routes.ears}/${id}`);
}
