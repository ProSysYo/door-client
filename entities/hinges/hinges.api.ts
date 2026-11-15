import { baseApi } from "@/shared/api/base-api";
import { Hinge, HingeCreate } from "./hinges.types";
import { routes } from "@/config/navigation";

export async function getHinges(): Promise<Hinge[]> {
    const { data } = await baseApi.get<Hinge[]>(routes.hinges);
    return data;
}

export async function getHinge(id: number): Promise<Hinge> {
    const { data } = await baseApi.get<Hinge>(`${routes.hinges}/${id}`);
    return data;
}

export async function createHinge(data: HingeCreate): Promise<Hinge> {
    const { data: created } = await baseApi.post<Hinge>(routes.hinges, data);
    return created;
}

export async function updateHinge(id: number, data: HingeCreate): Promise<Hinge> {
    const { data: updated } = await baseApi.patch<Hinge>(`${routes.hinges}/${id}`, data);
    return updated;
}

export async function deleteHinge(id: number): Promise<void> {
    await baseApi.delete(`${routes.hinges}/${id}`);
}
