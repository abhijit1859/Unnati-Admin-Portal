import axios from "axios"
import {create} from "zustand"

export const useLeadInfoStore = create((set) => ({
    leadInfo: [],
    getLeadInfo: async () => {
        const details = await axios.get("http://localhost:8000/api/v1/lead/lead-info", { withCredentials: true });
        
        set({leadInfo:details.data})
    },
    
}))