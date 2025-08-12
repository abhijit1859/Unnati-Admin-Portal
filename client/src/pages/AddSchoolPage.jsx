import React, { useState, useEffect } from "react";
import axios from "axios";
import { School } from "lucide-react";

export const AddSchoolPage = () => {
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [list, setList] = useState([]);

 
  const displaySchool = async () => {
    const details = await axios.get(
      "http://localhost:8000/api/v1/center/display-center",
      { withCredentials: true }
    );
    setList(details.data.centers);
  };

  useEffect(() => {
    displaySchool();
  }, []);

   
 const handleOnAddSchool = async () => {
   const details = await axios.post(
     "http://localhost:8000/api/v1/center/add-center",
     { schoolName, location, team },
     { withCredentials: true }
   );
 
   setList((prev) => [...prev, details.data.school]);

   setSchoolName("");
   setLocation("");
   setTeam("");
 };

 
  const handleOnDelete = async (id) => {
    await axios.post(
      "http://localhost:8000/api/v1/center/delete-center",
      { id },
      { withCredentials: true }
    );

 
    setList((prev) => prev.filter((school) => school._id !== id));
  };
  console.log(list)
  return (
    <div className="p-4 flex flex-col items-center justify-center gap-3 ">
      <div className="w-full p-5 border border-gray-200 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-3">+ Add new school</h1>

        <div className="flex gap-3 mb-5">
          <input
            placeholder="Enter School Name"
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-[45%] border border-gray-200 p-3 rounded-lg"
          />
          <input
            placeholder="Enter location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-[45%] border border-gray-200 p-3 rounded-lg"
          />
        </div>

        <div className="flex gap-3 mb-5">
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-[45%] border border-gray-200 p-3 rounded-lg"
          >
            <option value="">Select Team</option>
            <option value="Netritva">Netritva</option>
            <option value="DigiExplore">DigiXplore</option>
            <option value="Akshar">Akshar</option>
          </select>
        </div>

        <button
          className="bg-black text-white p-3 rounded-lg cursor-pointer"
          onClick={handleOnAddSchool}
        >
          Add School
        </button>
      </div>

      <div className="w-full p-5 border border-gray-200 shadow-lg rounded-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
          <School className="text-blue-500 w-6 h-6" />
          <h1 className="text-lg font-semibold">All School</h1>
        </div>

        <div className="space-y-2">
          {list?.map((school) => (
            <div
              key={school._id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
            >
              <div>
                <h1 className="text-gray-800 font-medium">
                  {school.schoolName}
                </h1>
                <p className="text-gray-500">{school.location}</p>
              </div>

              <button
                onClick={() => handleOnDelete(school._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
