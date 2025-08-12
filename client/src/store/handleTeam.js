import { create } from "zustand";
import axios from 'axios'

export const usehandleTeam = create((set) => ({
    requests: [],
    details: [],
    users:[],
    requestTojoinTeam: async ({ teamName }) => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/team/request", { teamName }, { withCredentials: true });
            console.log("Request sent:", res.data);
        } catch (err) {
            console.error("Failed to send request:", err.response?.data || err.message);
        }
    },
    getJoinRequest: async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/team/getRequest", {
                withCredentials: true,
            });
            console.log("Fetched join requests:", res.data);
           
            set({ requests: res.data });
        } catch (error) {
            console.error("Failed to fetch join requests:", error.response?.data || error.message);
        }
    },
    handleJoinRequest: async ({ requestId, action }) => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/team/validate", {
                requestId,
                action,
            }, { withCredentials: true });

            console.log("Handled request:", res.data);
            
            const updated = await axios.get("http://localhost:8000/api/v1/team/request", { withCredentials: true });
            set({ requests: updated.data });
        } catch (err) {
            console.error("Failed to handle request:", err.response?.data || err.message);
        }
    },
    userDetails: async () => {
        
         
        try {
            const res = await axios.get(
                `http://localhost:8000/api/v1/user/send`,
                { withCredentials: true }
            );


            set({ details: res.data });
            
            return res.data.data;

        } catch (error) {
            console.log(error);
        }
    },

    getAllDetails: async () => {
        const res = await axios.get("http://localhost:8000/api/v1/team/getAllDetails", { withCredentials: true })
       console.log(res.data.data)
        return res.data.data
        
    },
    removeuserFromTeam: async ({ userId, teamName }) => {
        const res = await axios.post("", { userId, teamName }, { withCredentials: true })
        console.log(res.data)
        
    },
    deleteUser: async (id) => {
        console.log(id)
        const res = await axios.delete(` http://localhost:8000/api/v1/user/deleteUser/${id}`, { withCredentials: true })
        console.log("user deleted")
    }

}))