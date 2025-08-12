import { create } from "zustand"
import axios from 'axios'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,



    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axios.get("http://localhost:8000/api/v1/auth/me", {
                withCredentials: true
            });

            set({ authUser: res.data.user });
        } catch (error) {
            console.log("Auth check error:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    


    login: async (email, password) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/auth/login', {
                email,
                password,
            },{withCredentials:true});
            set({ authUser: res.data.user });
            return true;
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    },


    logoutUser: async () => {
        try {
            await axios.delete("http://localhost:8000/api/v1/auth/logout", {
                withCredentials: true,
            });

            set({ authUser: null });
        } catch (error) {
            console.log("Logout error:", error);
        }
    },


    signup: async ({ name, email, password, UnnatiId, year }) => {
        set({ isSigninUp: true });

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/auth/register",
                { name, email, password, UnnatiId, year },
                { withCredentials: true }
            );

            set({ authUser: res.data.user });
            return true;
        } catch (error) {
            console.log("Signup error:", error?.response?.data?.message || error.message);
            return false;
        } finally {
            set({ isSigninUp: false });
        }
    },


}))