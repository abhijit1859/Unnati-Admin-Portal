import { create } from "zustand";
import api from "../lib/axios";  

export const usehandleTeam = create((set) => ({
    requests: [],
    details: [],
    users: [],

    requestTojoinTeam: async ({ teamName,teamType }) => {
        try {
            const res = await api.post("/team/request", { teamName:teamName,teamType:teamType });
            console.log("Request sent:", res.data);
        } catch (err) {
            console.error("Failed to send request:", err.response?.data || err.message);
        }
    },

    getJoinRequest: async () => {
        try {
            const res = await api.get("/team/getRequest");
            console.log("Fetched join requests:", res.data);
            set({ requests: res.data });
        } catch (error) {
            console.error("Failed to fetch join requests:", error.response?.data || error.message);
        }
    },

    handleJoinRequest: async ({ requestId, action }) => {
        try {
            const res = await api.post("/team/validate", { requestId, action });
            console.log("Handled request:", res.data);

            const updated = await api.get("/team/request");
            set({ requests: updated.data });
        } catch (err) {
            console.error("Failed to handle request:", err.response?.data || err.message);
        }
    },

    userDetails: async (id) => {
        try {
            const res = await api.post("/user/send", { userId: id });
            console.log(res.data);
            set({ details: res.data });
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    },

    getAllDetails: async () => {
        try {
            const res = await api.get("/team/getAllDetails");
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            console.error("Failed to fetch all details:", error.response?.data || error.message);
        }
    },

    removeUserFromTeam: async ({ userId, teamName }) => {
        try {
            const res = await api.post("/team/removeUser", { userId, teamName });  
            console.log(res.data);
        } catch (error) {
            console.error("Failed to remove user:", error.response?.data || error.message);
        }
    },

    deleteUser: async (id) => {
        try {
            const res = await api.delete(`/user/deleteUser/${id}`);
            console.log("User deleted:", res.data);
        } catch (error) {
            console.error("Failed to delete user:", error.response?.data || error.message);
        }
    },
}));
