import { create } from "zustand";

const authStore = create((set) => ({
    token: null,
    setAuth: (token) => {
        localStorage.setItem("accessToken", token);
        set({ token })
    },
    logout: () => {
        localStorage.removeItem("accessToken");
        set({ token: null })
    }
}))

export default authStore;