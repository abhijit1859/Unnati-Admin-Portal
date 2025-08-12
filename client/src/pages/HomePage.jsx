import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className="bg-[#F0FCF5] w-full min-h-screen flex flex-col items-center">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-bold m-3">Unnati</h1>
          <p className="text-lg text-center m-3">
            Empowering communities through Education, Health, and Environmental{" "}
            <br />
            initiatives. Join our mission to create positive change.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 m-4">
                  <button
                      onClick={()=>navigate('/login')}
                      className="cursor-pointer bg-white text-black py-3 px-6 rounded-lg border border-black hover:bg-gray-100 transition">
            Log-In
          </button>
          <button className="bg-black cursor-pointer text-white py-3 px-6 rounded-lg border border-white hover:bg-gray-900 transition">
            Join-Us
          </button>
        </div>

        <div className="flex flex-col items-center justify-around p-6 bg-white w-[80%] h-72 rounded-xl shadow-md">
          <h1 className="text-black font-bold text-3xl mb-4">Our Teams</h1>
          <div className="flex items-center justify-center gap-52">
            <div className="w-32 h-32 bg-green-300 flex items-center justify-center rounded-lg shadow text-black font-semibold text-center px-2">
              DigiXplore
            </div>
            <div className="w-32 h-32 bg-blue-300 flex items-center justify-center rounded-lg shadow text-black font-semibold text-center px-2">
              Netritva
            </div>
            <div className="w-32 h-32 bg-yellow-300 flex items-center justify-center rounded-lg shadow text-black font-semibold text-center px-2">
              Akshar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
