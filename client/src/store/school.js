import { create } from "zustand";
import axios from 'axios'
export const useCenterStore = create((set) => ({
    
    addCenter: async(schoolName,location,team)=> {
        const details = await axios.post("http://localhost:8000/api/v1/center/add-center", { schoolName, location, team }, { withCredentials: true })
        console.log(details.data)
    },
    centerList: async () => {
        const details = await axios.get("http://localhost:8000/api/v1/center/display-center", { withCredentials: true })
         
        set({list:details.data.centers})
    },
    deleteCenter: async (id) => {
        const details = await axios.post("http://localhost:8000/api/v1/center/delete-center", { id:id },
            {withCredentials:true}
        )
        console.log(details.data)
    }
}))