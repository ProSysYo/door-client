import { baseApi } from "@/shared/api/base-api";
import type { Knob, KnobCreate } from "./knobs.types";

export async function getKnobs(): Promise<Knob[]> {
    const { data } = await baseApi.get<Knob[]>("/knobs");
    return data;
}

export async function getKnob(id: number): Promise<Knob> {
    const { data } = await baseApi.get<Knob>(`/knobs/${id}`);
    return data;
}

export async function createKnob(data: KnobCreate): Promise<Knob> {
    const { data: created } = await baseApi.post<Knob>("/knobs", data);
    return created;
}

export async function updateKnob(id: number, data: KnobCreate): Promise<Knob> {
    const { data: updated } = await baseApi.put<Knob>(`/knobs/${id}`, data);
    return updated;
}

export async function deleteKnob(id: number): Promise<void> {
    await baseApi.delete(`/knobs/${id}`);
}
