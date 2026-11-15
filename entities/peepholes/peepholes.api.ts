import { baseApi } from "@/shared/api/base-api";
import { Peephole, PeepholeCreate } from "./peepholes.types";
import { routes } from "@/config/navigation";

export async function getPeepholes(): Promise<Peephole[]> {
    const { data } = await baseApi.get<Peephole[]>(routes.peepholes);
    return data;
}

export async function getPeephole(id: number): Promise<Peephole> {
    const { data } = await baseApi.get<Peephole>(`${routes.peepholes}/${id}`);
    return data;
}

export async function createPeephole(data: PeepholeCreate): Promise<Peephole> {
    const { data: created } = await baseApi.post<Peephole>(routes.peepholes, data);
    return created;
}

export async function updatePeephole(id: number, data: PeepholeCreate): Promise<Peephole> {
    const { data: updated } = await baseApi.patch<Peephole>(`${routes.peepholes}/${id}`, data);
    return updated;
}

export async function deletePeephole(id: number): Promise<void> {
    await baseApi.delete(`${routes.peepholes}/${id}`);
}
