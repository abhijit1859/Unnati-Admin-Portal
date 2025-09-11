import { Users, Send, Loader, PanelLeft,SquareChevronLeft,SquareChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAttendanceStore } from "../store/attendance";
import axios from "axios";
import toast from "react-hot-toast";
import { useCenterStore } from "../store/school";
import { SideBar } from "../components/SideBar";
import { Logout } from "../components/Logout";
import { useAuthStore } from "../store/authStore";

export const AttendancePage = ({role}) => {
  const { fetchData, userDetailsForAttendance } = useAttendanceStore();
  const { centerList, list } = useCenterStore();

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [centerName, setCenterName] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [isOpen, setIsOpen] = useState(true);  
 

  useEffect(() => {
    centerList();
  }, [centerList]);
  

  const handleFetchData = async () => {
    await fetchData(teamName, batch, centerName);
  };

  const handleCheckBoxChange = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const markAttendance = async () => {
    if (!inTime || !outTime) {
      toast.error("Please enter both In Time and Out Time");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/attendance/mark",
        {
          teamName,
          userIds: selectedUserIds,
          inTime,
          outTime,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };
   console.log(role)
  return (
    <div className="flex h-screen">
      {role === "ADMIN" && <SideBar isOpen={isOpen} />}

      <div className="flex-1 bg-slate-50 p-6 overflow-auto">
        {role === "ADMIN" && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mb-2 p-2 text-black bg-gray-200 rounded flex items-center gap-2"
            >
              {isOpen ? (
                <SquareChevronLeft className="w-6 h-6" />
              ) : (
                <SquareChevronRight className="w-6 h-6" />
              )}
            </button>
            <Logout />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Attendance Marking
          </h1>
          <p className="text-slate-600 mt-2">
            Mark attendance for team members
          </p>
        </div>

        {/* Selection Panel */}
        <div className="w-full border border-slate-200 shadow-lg rounded-2xl bg-[#FEFAF5] p-6 mb-8">
          <div className="flex gap-4 items-center mb-6">
            <Users className="text-emerald-600" size={32} />
            <h2 className="text-2xl font-semibold text-slate-800">
              Select Team, Center & Year
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Team Selection */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-slate-700 font-medium mb-1">Team</label>
              <select
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2"
              >
                <option value="" disabled>
                  Select Team
                </option>
                <option value="DigiExplore">DigiXplore</option>
                <option value="Netritva">Netritva</option>
                <option value="Akshar">Akshar</option>
              </select>
            </div>

            {/* Center Selection */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-slate-700 font-medium mb-1">Center</label>
              <select
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2"
              >
                <option value="" disabled>
                  Select Center
                </option>
                {Array.isArray(list) && list.length > 0 ? (
                  list.map((school) => (
                    <option key={school._id} value={school.schoolName}>
                      {school.schoolName}
                    </option>
                  ))
                ) : (
                  <option disabled>No centers available</option>
                )}
              </select>
            </div>

            {/* Year Selection */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-slate-700 font-medium mb-1">Year</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2"
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <button
                onClick={handleFetchData}
                className="w-full md:w-auto bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600"
              >
                Load Members
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        {userDetailsForAttendance.length > 0 ? (
          <div className="overflow-x-auto w-full border border-slate-200 shadow-lg rounded-2xl bg-[#FEFAF5] p-6 mb-8">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Mark</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Batch</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Classes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userDetailsForAttendance.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600"
                        value={user._id}
                        onChange={() => handleCheckBoxChange(user._id)}
                        checked={selectedUserIds.includes(user._id)}
                      />
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.batch}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.classes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Time Inputs */}
            <div className="flex flex-col sm:flex-row mt-6 gap-6 items-center bg-[#FEFAF5] p-4">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  In Time
                </label>
                <input
                  value={inTime}
                  onChange={(e) => setInTime(e.target.value)}
                  type="time"
                  className="border bg-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Out Time
                </label>
                <input
                  value={outTime}
                  onChange={(e) => setOutTime(e.target.value)}
                  type="time"
                  className="border bg-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-4">
              <button
                onClick={markAttendance}
                className="flex items-center gap-2 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? "Submitting..." : "Submit Attendance"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-slate-600">No users loaded</div>
        )}
      </div>
    </div>
  );
};
