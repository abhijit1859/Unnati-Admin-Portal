import React from "react";
import { useAuthStore } from "../store/authStore";
import { LogOut } from "lucide-react";

export const Logout = () => {
  
  const { logoutUser } = useAuthStore();
  return (
    <button
      onClick={logoutUser}
      className="  px-4 py-2 rounded-lg shadow-md 
                   active:scale-95 transition-all 
                 cursor-pointer mr-3"
    >
      <LogOut/>
    </button>
  );
};
