import api from "./api";
import authStore from "@/store/store";

export const login = async (payload) => {
    const { headers, data } = await api.post("/api/auth/login", payload);
    authStore.getState().setAuth(headers.authorization);
    return data;
}

export const signup = async (payload) => {
    const { headers, data } = await api.post("/api/auth/register", payload);
    authStore.getState().setAuth(headers.authorization);
    return data;
};

