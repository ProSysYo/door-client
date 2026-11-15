import { baseApi } from "@/shared/api/base-api";
import { OutsideFinish, OutsideFinishCreate } from "./outside-finishes.types";
import { routes } from "@/config/navigation";

export async function getOutsideFinishes(): Promise<OutsideFinish[]> {
    const { data } = await baseApi.get<OutsideFinish[]>(routes.outsideFinishes);
    return data;
}

export async function getOutsideFinish(id: number): Promise<OutsideFinish> {
    const { data } = await baseApi.get<OutsideFinish>(`${routes.outsideFinishes}/${id}`);
    return data;
}

export async function createOutsideFinish(data: OutsideFinishCreate): Promise<OutsideFinish> {
    const { data: created } = await baseApi.post<OutsideFinish>(routes.outsideFinishes, data);
    return created;
}

export async function updateOutsideFinish(id: number, data: OutsideFinishCreate): Promise<OutsideFinish> {
    const { data: updated } = await baseApi.patch<OutsideFinish>(`${routes.outsideFinishes}/${id}`, data);
    return updated;
}

export async function deleteOutsideFinish(id: number): Promise<void> {
    await baseApi.delete(`${routes.outsideFinishes}/${id}`);
}
