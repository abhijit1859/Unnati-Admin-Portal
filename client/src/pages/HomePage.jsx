import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-green-50 w-full min-h-screen flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Unnati
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Empowering communities through Education, Health, and Environmental
          initiatives. <br />
          Join our mission to create positive change.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black py-3 px-8 rounded-lg border border-black hover:bg-gray-100 transition font-medium shadow-md"
          >
            Log-In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-black text-white py-3 px-8 rounded-lg border border-black hover:bg-gray-900 transition font-medium shadow-md"
          >
            Join-Us
          </button>
        </div>
      </div>

      {/* Teams Section */}
      <div className="flex flex-col items-center mt-12 w-full max-w-5xl px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Our Teams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          <div className="bg-green-300 flex items-center justify-center rounded-xl shadow-lg text-black font-semibold text-center p-6 hover:scale-105 transform transition">
            DigiXplore
          </div>
          <div className="bg-blue-300 flex items-center justify-center rounded-xl shadow-lg text-black font-semibold text-center p-6 hover:scale-105 transform transition">
            Netritva
          </div>
          <div className="bg-yellow-300 flex items-center justify-center rounded-xl shadow-lg text-black font-semibold text-center p-6 hover:scale-105 transform transition">
            Akshar
          </div>
        </div>
      </div>

      {/* Footer or Info Section */}
      <div className="mt-16 text-center text-gray-600 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Unnati. All rights reserved.
      </div>
    </div>
  );
};
