import { create } from 'zustand'
import api from '../lib/axios'
import toast from 'react-hot-toast'


export const useSideTeamStore = create((set, get) => ({
    teamInfo: [],

    createTeam: async ({ teamName }) => {
        await api.post("/sideTeam/create", { teamName }, { withCredentials: true })
        console.log("done")
      
        get().fetchTeam()
    },

    fetchTeam: async () => {
        const res = await api.get("/sideTeam/display", { withCredentials: true })

        set(() => ({
            teamInfo: res.data.teams 
        }))

        console.log(res.data.teams)  
    },

    deleteTeam: async (id) => {
        
        await api.post("/sideTeam/delete", { id }, { withCredentials: true })
            .then(() => toast("Team deleted"))
            .catch(()=>toast("Internal Server Error"))
        
    }
}))
