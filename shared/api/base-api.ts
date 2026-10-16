import axios from "axios";
import { env } from "@/shared/config/env";

export const baseApi = axios.create({
    baseURL: env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
