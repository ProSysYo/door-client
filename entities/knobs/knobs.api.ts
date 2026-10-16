import type { AxiosInstance } from "axios";
import { Knob, KnobCreate, KnobFilters, KnobsResponse } from "./knobs.types";

export class KnobsApi {
    constructor(private readonly axios: AxiosInstance) {}

    async getKnobs(filters?: KnobFilters): Promise<KnobsResponse> {
        const { data } = await this.axios.get<Knob[]>("/knobs", { params: filters });
        return {
            items: data ?? [],
            pagination: {
                page: filters?.page ?? 1,
                limit: filters?.limit ?? 20,
                total: data?.length ?? 0,
                totalPages: 1,
            },
        };
    }

    async getKnob(id: number): Promise<Knob> {
        const { data } = await this.axios.get<Knob>(`/knobs/${id}`);
        return data;
    }

    async createKnob(data: KnobCreate): Promise<Knob> {
        const { data: created } = await this.axios.post<Knob>("/knobs", data);
        return created;
    }

    async updateKnob(id: number, data: KnobCreate): Promise<Knob> {
        const { data: updated } = await this.axios.put<Knob>(`/knobs/${id}`, data);
        return updated;
    }

    async deleteKnob(id: number): Promise<void> {
        await this.axios.delete(`/knobs/${id}`);
    }
}
