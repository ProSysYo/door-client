import { baseApi } from "@/shared/api/base-api";
import { Foil, FoilCreate } from "./foils.types";
import { routes } from "@/config/navigation";

export async function getFoils(): Promise<Foil[]> {
    const { data } = await baseApi.get<Foil[]>(routes.foils);
    return data;
}

export async function getFoil(id: number): Promise<Foil> {
    const { data } = await baseApi.get<Foil>(`${routes.foils}/${id}`);
    return data;
}

export async function createFoil(data: FoilCreate): Promise<Foil> {
    const { data: created } = await baseApi.post<Foil>(routes.foils, data);
    return created;
}

export async function updateFoil(id: number, data: FoilCreate): Promise<Foil> {
    const { data: updated } = await baseApi.patch<Foil>(`${routes.foils}/${id}`, data);
    return updated;
}

export async function deleteFoil(id: number): Promise<void> {
    await baseApi.delete(`${routes.foils}/${id}`);
}
