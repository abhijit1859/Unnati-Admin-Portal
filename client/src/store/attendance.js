import { create } from 'zustand';
import axios from 'axios';

export const useAttendanceStore = create((set) => ({
    userDetailsForAttendance:[],
    fetchData: async (team, batch, centerName) => {
        try {
            console.log(team)
            console.log(batch)
       
            const res = await axios.post(
                "http://localhost:8000/api/v1/attendance/fetchData",
                { teamName:team, batchYear:Number(batch),centerName:centerName },
                { withCredentials: true }
            );
            console.log(res.data)
            set({userDetailsForAttendance:res.data.students})
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    }
}));
