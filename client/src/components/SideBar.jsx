import React from "react";

export const SideBar = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-40" : "w-0"
      } h-screen bg-gray-900 text-white transition-all duration-300`}
    >
     
      <div className="p-4">{isOpen ? <p>Full Sidebar</p> : <p>Icons</p>}</div>
    </div>
  );
};
