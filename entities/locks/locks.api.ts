import { baseApi } from "@/shared/api/base-api";
import { Lock, LockCreate } from "./locks.types";
import { routes } from "@/config/navigation";

export async function getLocks(): Promise<Lock[]> {
    const { data } = await baseApi.get<Lock[]>(routes.locks);
    return data;
}

export async function getLock(id: number): Promise<Lock> {
    const { data } = await baseApi.get<Lock>(`${routes.locks}/${id}`);
    return data;
}

export async function createLock(data: LockCreate): Promise<Lock> {
    const { data: created } = await baseApi.post<Lock>(routes.locks, data);
    return created;
}

export async function updateLock(id: number, data: LockCreate): Promise<Lock> {
    const { data: updated } = await baseApi.patch<Lock>(`${routes.locks}/${id}`, data);
    return updated;
}

export async function deleteLock(id: number): Promise<void> {
    await baseApi.delete(`${routes.locks}/${id}`);
}
