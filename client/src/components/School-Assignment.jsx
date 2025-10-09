import React, { useEffect, useState } from 'react';
import { useCenterStore } from '../store/school';
import api from '../lib/axios';

const SchoolAssignment = () => {
  const { centerList, list } = useCenterStore();
  const [schools, setSchools] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [batch, setBatch] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  // Fetch centers once on mount
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        await centerList();
        setSchools(list);
      } catch (err) {
        console.error("Failed to load centers:", err);
      }
    };
    fetchCenters();
  }, [centerList, list]);

  // Load members
  const fetchUserDetails = async () => {
    if (!teamName || !batch) {
      setError("Please select both team and batch year");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.post(
        "/team-assignment/load-members",
        { teamName, year: batch }
      );
      setMembers(res.data.members || []);
      setSelectedMembers([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  // Toggle member selection
  const handleSelectMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Assign selected members
  const assignMembers = async () => {
    if (selectedMembers.length === 0 || !selectedSchool) {
      setError("Please select members and a school");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.post(
        "/team-assignment/create",
        {
          teamName,
          batch,
          schoolName: selectedSchool,
          userIds: selectedMembers,
        }
      );
      console.log(res.data);
      alert("Members assigned successfully!");
      setSelectedMembers([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to assign members");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-6">
      <h1 className="text-blue-600 text-4xl font-bold mb-6">Team Assignment</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Team Select */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="team" className="block mb-2 font-medium text-gray-700">
            Team:
          </label>
          <select
            id="team"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          >
            <option value="">Select Team</option>
            <option value="DigiExplore">DigiXplore</option>
            <option value="Netritva">Netritva</option>
            <option value="Akshar">Akshar</option>
          </select>
        </div>

        {/* Batch Select */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="batch" className="block mb-2 font-medium text-gray-700">
            Batch Year:
          </label>
          <select
            id="batch"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Load Members */}
        <div className="flex items-end min-w-[150px]">
          <button
            onClick={fetchUserDetails}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg h-12 shadow transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Members"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Members Table */}
      {members.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Members:</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="w-12 px-2 py-3 border-b text-center">✔</th>
                  <th className="px-4 py-3 border-b text-left font-medium text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 border-b text-left font-medium text-gray-700">
                    Associated Center
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => (
                  <tr
                    key={member._id}
                    className={`transition hover:bg-blue-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="w-12 px-2 py-2 border-b text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        checked={selectedMembers.includes(member._id)}
                        onChange={() => handleSelectMember(member._id)}
                      />
                    </td>
                    <td className="px-4 py-2 border-b text-gray-800">{member.name}</td>
                    <td className="px-4 py-2 border-b text-gray-600">
                      {member.associatedCenter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* School Select */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              Assign to School:
            </label>
            <select
              className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">Select School</option>
              {schools.map((school) => (
                <option key={school._id} value={school.schoolName}>
                  {school.schoolName}
                </option>
              ))}
            </select>
          </div>

          {/* Assign Button */}
          <button
            onClick={assignMembers}
            className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition disabled:opacity-50"
            disabled={loading || selectedMembers.length === 0 || !selectedSchool}
          >
            Assign Selected Members
          </button>
        </div>
      )}
    </div>
  );
};

export default SchoolAssignment;
