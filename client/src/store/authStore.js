import { create } from "zustand";
import api from "../lib/axios";  

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await api.get("/auth/me");   
            set({ authUser: res.data.user });
        } catch (error) {
            console.log("Auth check error:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            set({ authUser: res.data.user });
            return true;
        } catch (err) {
            console.error("Login error:", err);
            return false;
        }
    },

    logoutUser: async () => {
        try {
            await api.delete("/auth/logout");
            set({ authUser: null });
        } catch (error) {
            console.log("Logout error:", error);
        }
    },

    signup: async ({ name, email, password, UnnatiId, year }) => {
        set({ isSigninUp: true });
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
                UnnatiId,
                year,
            });
            set({ authUser: res.data.user });
            return true;
        } catch (error) {
            console.log(
                "Signup error:",
                error?.response?.data?.message || error.message
            );
            return false;
        } finally {
            set({ isSigninUp: false });
        }
    },
}));
