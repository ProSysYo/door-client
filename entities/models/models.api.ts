import { baseApi } from "@/shared/api/base-api";
import { Model, ModelCreate } from "./models.types";
import { routes } from "@/config/navigation";

export async function getModels(): Promise<Model[]> {
    const { data } = await baseApi.get<Model[]>(routes.models);
    return data;
}

export async function getModel(id: number): Promise<Model> {
    const { data } = await baseApi.get<Model>(`${routes.models}/${id}`);
    return data;
}

export async function createModel(data: ModelCreate): Promise<Model> {
    const { data: created } = await baseApi.post<Model>(routes.models, data);
    return created;
}

export async function updateModel(id: number, data: ModelCreate): Promise<Model> {
    const { data: updated } = await baseApi.patch<Model>(`${routes.models}/${id}`, data);
    return updated;
}

export async function deleteModel(id: number): Promise<void> {
    await baseApi.delete(`${routes.models}/${id}`);
}
