import { baseApi } from "@/shared/api/base-api";
import { Paint, PaintCreate } from "./paints.types";
import { routes } from "@/config/navigation";

export async function getPaints(): Promise<Paint[]> {
    const { data } = await baseApi.get<Paint[]>(routes.paints);
    return data;
}

export async function getPaint(id: number): Promise<Paint> {
    const { data } = await baseApi.get<Paint>(`${routes.paints}/${id}`);
    return data;
}

export async function createPaint(data: PaintCreate): Promise<Paint> {
    const { data: created } = await baseApi.post<Paint>(routes.paints, data);
    return created;
}

export async function updatePaint(id: number, data: PaintCreate): Promise<Paint> {
    const { data: updated } = await baseApi.patch<Paint>(`${routes.paints}/${id}`, data);
    return updated;
}

export async function deletePaint(id: number): Promise<void> {
    await baseApi.delete(`${routes.paints}/${id}`);
}
