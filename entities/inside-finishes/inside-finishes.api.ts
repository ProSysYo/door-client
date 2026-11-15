import { baseApi } from "@/shared/api/base-api";
import { InsideFinish, InsideFinishCreate } from "./inside-finishes.types";
import { routes } from "@/config/navigation";

export async function getInsideFinishes(): Promise<InsideFinish[]> {
    const { data } = await baseApi.get<InsideFinish[]>(routes.insideFinishes);
    return data;
}

export async function getInsideFinish(id: number): Promise<InsideFinish> {
    const { data } = await baseApi.get<InsideFinish>(`${routes.insideFinishes}/${id}`);
    return data;
}

export async function createInsideFinish(data: InsideFinishCreate): Promise<InsideFinish> {
    const { data: created } = await baseApi.post<InsideFinish>(routes.insideFinishes, data);
    return created;
}

export async function updateInsideFinish(id: number, data: InsideFinishCreate): Promise<InsideFinish> {
    const { data: updated } = await baseApi.patch<InsideFinish>(`${routes.insideFinishes}/${id}`, data);
    return updated;
}

export async function deleteInsideFinish(id: number): Promise<void> {
    await baseApi.delete(`${routes.insideFinishes}/${id}`);
}
