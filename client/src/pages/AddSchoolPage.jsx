import React, { useState, useEffect } from "react";
import api from "../lib/axios";
import { School, SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { SideBar } from "../components/SideBar";

export const AddSchoolPage = ({ role }) => {
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const displaySchool = async () => {
    try {
      const details = await api.get(
        "/center/display-center"
      );
      setList(details.data.centers || []);
    } catch (err) {
      console.error("Error fetching centers", err);
    }
  };

  useEffect(() => {
    displaySchool();
  }, []);

  const handleOnAddSchool = async () => {
    try {
      const details = await api.post(
        "/center/add-center",
        { schoolName, location, team }
      );
      setList((prev) => [...prev, details.data.school]);
      setSchoolName("");
      setLocation("");
      setTeam("");
    } catch (err) {
      console.error("Error adding school", err);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await api.post(
        "/center/delete-center",
        { id }
      );
      setList((prev) => prev.filter((school) => school._id !== id));
    } catch (err) {
      console.error("Error deleting school", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for ADMIN only */}
      {role === "ADMIN" && <SideBar isOpen={isOpen} />}

      <div className="flex-1 p-6 bg-slate-50 overflow-auto">
        {role === "ADMIN" && (
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-200 rounded flex items-center gap-2"
            >
              {isOpen ? (
                <SquareChevronLeft className="w-6 h-6" />
              ) : (
                <SquareChevronRight className="w-6 h-6" />
              )}
            </button>
          </div>
        )}

        {/* Add school form */}
        <div className="w-full p-5 border border-gray-200 shadow-lg rounded-lg bg-white mb-6">
          <h1 className="text-2xl font-semibold mb-3">+ Add new school</h1>

          <div className="flex gap-3 mb-5">
            <input
              placeholder="Enter School Name"
              type="text"
              value={schoolName}
              onChange={(e) => {
               
                setSchoolName(e.target.value)}}
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
            className="bg-black text-white p-3 rounded-lg"
            onClick={handleOnAddSchool}
          >
            Add School
          </button>
        </div>

        {/* School list */}
        <div className="w-full p-5 border border-gray-200 shadow-lg rounded-lg bg-white space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <School className="text-blue-500 w-6 h-6" />
            <h1 className="text-lg font-semibold">All Schools</h1>
          </div>

          {list.length > 0 ? (
            list.map((school) => (
              <div
                key={school._id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:shadow-md"
              >
                <div>
                  <h1 className="text-gray-800 font-medium">
                    {school.schoolName}
                  </h1>
                  <p className="text-gray-500">{school.location}</p>
                </div>

                <button
                  onClick={() => handleOnDelete(school._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No schools added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
