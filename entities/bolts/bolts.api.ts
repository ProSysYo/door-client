import { baseApi } from "@/shared/api/base-api";
import { Bolt, BoltCreate } from "./bolts.types";
import { routes } from "@/config/navigation";

export async function getBolts(): Promise<Bolt[]> {
    const { data } = await baseApi.get<Bolt[]>(routes.bolts);
    return data;
}

export async function getBolt(id: number): Promise<Bolt> {
    const { data } = await baseApi.get<Bolt>(`${routes.bolts}/${id}`);
    return data;
}

export async function createBolt(data: BoltCreate): Promise<Bolt> {
    const { data: created } = await baseApi.post<Bolt>(routes.bolts, data);
    return created;
}

export async function updateBolt(id: number, data: BoltCreate): Promise<Bolt> {
    const { data: updated } = await baseApi.patch<Bolt>(`${routes.bolts}/${id}`, data);
    return updated;
}

export async function deleteBolt(id: number): Promise<void> {
    await baseApi.delete(`${routes.bolts}/${id}`);
}
