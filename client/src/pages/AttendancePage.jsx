import { Users } from "lucide-react";
import React, { useState } from "react";
import { useAttendanceStore } from "../store/attendance";
import axios from "axios"
import toast from "react-hot-toast";
import { Send, Loader } from "lucide-react";
import { useCenterStore } from "../store/school";
import { useEffect } from "react";


export const AttendancePage = () => {
  const { fetchData, userDetailsForAttendance } = useAttendanceStore();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [teamName, setTeamName] = useState("")
  const [centerName,setCenterName]=useState("")
  const [batch, setBatch] = useState()
  const [loading,setLoading]=useState(false)

  const markAttendance = async () => {
    setLoading(true)
    const res = await axios.post(
      
      "http://localhost:8000/api/v1/attendance/mark",
      { teamName, userIds:selectedUserIds, },
      { withCredentials: true }
    );

    toast(res.data.message)
        setLoading(false);
  }

  const { centerList,list } = useCenterStore();


  useEffect(()=>{centerList()},[])
   

  const handleFetchData = async () => {
     
    await fetchData(teamName, batch,centerName);
    
  };

  const handleCheckBoxChange = (userId) => {
    setSelectedUserIds((prev =>
      prev.includes(userId) ?
        prev.filter((id) => id !== userId) :
        [...prev,userId]
    ))
  }

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Attendance Marking
        </h1>
        <p className="text-slate-600 mt-2">Mark attendance for team members</p>
      </div>

      {/* Selection Panel */}
      <div className="w-full border border-slate-200 shadow-lg rounded-2xl bg-white p-6 mb-8">
        <div className="flex gap-4 items-center mb-6">
          <Users className="text-emerald-600" size={32} />
          <h2 className="text-2xl font-semibold text-slate-800">
            Select Team and Year
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Team Selection */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-slate-700 font-medium mb-1">Team</label>
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select Team
              </option>
              <option value="DigiExplore">DigiXplore</option>
              <option value="Netritva">Netritva</option>
              <option value="Akshar">Akshar</option>
            </select>
          </div>
          <br />
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-slate-700 font-medium mb-1">Number</label>
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => {
                setCenterName(e.target.value);
              }}
            >
              {Array.isArray(list) && list.length > 0 ? (
                list.map((school) => (
                  <option key={school.schoolName} value={school.schoolName}>
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
              className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => {
                setBatch(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select Year
              </option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Load Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={handleFetchData}
              className="w-full md:w-auto bg-rose-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-600 transition duration-200"
            >
              Load Members
            </button>
          </div>
        </div>
      </div>

      {/* Table */}

      {userDetailsForAttendance.length > 0 ? (
        <div className="overflow-x-auto w-full border border-slate-200 shadow-lg rounded-2xl bg-white p-6 mb-8">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left rounded-lg">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide text-xs rounded-lg">
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
                <tr key={user._id || index} className="hover:bg-gray-50">
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
          <div className="flex justify-end mt-4">
            <button
              onClick={markAttendance}
              className="flex items-center gap-2 bg-black hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting...." : "Submit Attendance"}
            </button>
          </div>
        </div>
      ) : (
        <div>No users loaded</div>
      )}
    </div>
  );
};
