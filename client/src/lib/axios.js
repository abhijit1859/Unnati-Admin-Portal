import axios from 'axios'

const api = axios.create({
    baseURL: "https://unnati-admin-portal-1.onrender.com/api/v1" ,
    // || "http://localhost:8000/api/v1",
    withCredentials: true,
});


export default api
