import { create } from "zustand";
import api from "../lib/axios"; 
export const useCenterStore = create((set) => ({
    list: [],

    addCenter: async (schoolName, location, team) => {
        try {
            const res = await api.post("/center/add-center", { schoolName, location, team });
            console.log(res.data);
        } catch (error) {
            console.error("Failed to add center:", error.response?.data || error.message);
        }
    },

    centerList: async () => {
        try {
            const res = await api.get("/center/display-center");
            set({ list: res.data.centers });
        } catch (error) {
            console.error("Failed to fetch centers:", error.response?.data || error.message);
        }
    },

    deleteCenter: async (id) => {
        try {
            const res = await api.post("/center/delete-center", { id });
            console.log(res.data);
        } catch (error) {
            console.error("Failed to delete center:", error.response?.data || error.message);
        }
    },
}));
