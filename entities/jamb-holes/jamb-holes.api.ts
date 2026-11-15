import { baseApi } from "@/shared/api/base-api";
import { JambHole, JambHoleCreate } from "./jamb-holes.types";
import { routes } from "@/config/navigation";

export async function getJambHoles(): Promise<JambHole[]> {
    const { data } = await baseApi.get<JambHole[]>(routes.jambHoles);
    return data;
}

export async function getJambHole(id: number): Promise<JambHole> {
    const { data } = await baseApi.get<JambHole>(`${routes.jambHoles}/${id}`);
    return data;
}

export async function createJambHole(data: JambHoleCreate): Promise<JambHole> {
    const { data: created } = await baseApi.post<JambHole>(routes.jambHoles, data);
    return created;
}

export async function updateJambHole(id: number, data: JambHoleCreate): Promise<JambHole> {
    const { data: updated } = await baseApi.patch<JambHole>(`${routes.jambHoles}/${id}`, data);
    return updated;
}

export async function deleteJambHole(id: number): Promise<void> {
    await baseApi.delete(`${routes.jambHoles}/${id}`);
}
