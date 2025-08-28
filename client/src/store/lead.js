import { create } from "zustand";
import api from "../lib/axios";  

export const useLeadInfoStore = create((set) => ({
    leadInfo: [],

    getLeadInfo: async () => {
        try {
            const details = await api.get("/lead/lead-info"); // 👈 cleaner, no hardcoding
            set({ leadInfo: details.data });
        } catch (error) {
            console.error("Failed to fetch lead info:", error.response?.data || error.message);
        }
    },
}));
