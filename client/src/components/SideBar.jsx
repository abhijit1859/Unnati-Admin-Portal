import React from "react";
import { LayoutDashboard, CalendarCheck, User, ShieldUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ isOpen }) => {
  const nav = useNavigate();

  return (
    <div
      className={`${
        isOpen ? "w-56" : "w-0"
      } h-screen bg-[#F9F7F5] text-black transition-all duration-300 shadow-lg flex flex-col overflow-hidden`}
    >
      <div className="p-4 border-b flex items-center">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-yellow-500 flex items-center justify-center">
              <ShieldUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Admin Portal</h1>
              <p className="text-xs text-gray-500">Management Portal</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-3">
        <ul className="space-y-1">
          <li
            onClick={() => nav("/admin")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-100 transition cursor-pointer"
          >
            <LayoutDashboard size={20} className="text-gray-700" />
            {isOpen && <span className="font-medium">Dashboard</span>}
          </li>

          <li
            onClick={() => nav("/attendance")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-100 transition cursor-pointer"
          >
            <CalendarCheck size={20} className="text-gray-700" />
            {isOpen && <span className="font-medium">Attendance</span>}
          </li>

          <li
            onClick={() => nav("/side-team")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-100 transition cursor-pointer"
          >
            <User size={20} className="text-gray-700" />
            {isOpen && <span className="font-medium">Teams</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};
