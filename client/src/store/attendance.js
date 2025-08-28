import { create } from "zustand";
import api from "../lib/axios";  

export const useAttendanceStore = create((set) => ({
    userDetailsForAttendance: [],

    fetchData: async (team, batch, centerName) => {
        try {
            const res = await api.post("/attendance/fetchData", {
                teamName: team,
                batchYear: Number(batch),
                centerName: centerName,
            });
            set({ userDetailsForAttendance: res.data.students });
        } catch (error) {
            console.error("Error fetching attendance data:", error.response?.data || error.message);
        }
    },
}));
