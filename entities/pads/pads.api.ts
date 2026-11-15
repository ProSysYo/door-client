import { baseApi } from "@/shared/api/base-api";
import { Pad, PadCreate } from "./pads.types";
import { routes } from "@/config/navigation";

export async function getPads(): Promise<Pad[]> {
    const { data } = await baseApi.get<Pad[]>(routes.pads);
    return data;
}

export async function getPad(id: number): Promise<Pad> {
    const { data } = await baseApi.get<Pad>(`${routes.pads}/${id}`);
    return data;
}

export async function createPad(data: PadCreate): Promise<Pad> {
    const { data: created } = await baseApi.post<Pad>(routes.pads, data);
    return created;
}

export async function updatePad(id: number, data: PadCreate): Promise<Pad> {
    const { data: updated } = await baseApi.patch<Pad>(`${routes.pads}/${id}`, data);
    return updated;
}

export async function deletePad(id: number): Promise<void> {
    await baseApi.delete(`${routes.pads}/${id}`);
}
