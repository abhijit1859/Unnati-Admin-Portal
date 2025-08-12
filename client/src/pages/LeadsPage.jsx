import React from 'react'
import { useLeadInfoStore } from '../store/lead';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ColumnsSettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const LeadsPage = () => {
  const { getLeadInfo, leadInfo } = useLeadInfoStore()
  const [teamInfo, setTeamInfo] = useState([])
  const [schoolInfo, setSchoolInfo] = useState([])
  const [school, setSchool] = useState("");
  const [user, setUser] = useState("")
  const navigate = useNavigate()


  useEffect(() => { getLeadInfo() }, [])



  
  const getMembersList = async () => {
    try {
     const res = await axios.get(
       "http://localhost:8000/api/v1/lead/team-info",
       { withCredentials: true }
     );
      const schoolRes = await axios.get(
        "http://localhost:8000/api/v1/center/display-center",
        {withCredentials:true}
      );
      setTeamInfo(res.data.members)
      setSchoolInfo(schoolRes.data.centers);
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() => {
    getMembersList()
    
  }, [])

  const assignSchool = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/center/assign-center",
        { userId: user, centerName: school },
        { withCredentials: true }
      );
      toast(res.data)
      
    } catch (err) {
      if (err.response) {
        toast(err.response.data.message)
       
         
      } else {
        toast("Request Failed")
        console.error("Request failed:", err.message);
      }
    }
  };


  
  console.log(user,school)
 
  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-2">
          Team Management
        </h1>
        <p className="text-center     text-gray-500 mb-10">
          Welcome back {leadInfo?.user?.name}
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="w-full md:w-[45%] bg-white min-h-[300px] border border-gray-200 shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Add New Member
            </h2>
            <form className="space-y-5">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter member's email"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 w-full"
              >
                Add Member
              </button>
            </form>
          </div>

          <div className="w-full md:w-[45%] bg-white min-h-[300px] border border-gray-200 shadow-md rounded-xl p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Team Overview
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Total Members: </span> 0
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Your Role:</span>{" "}
              <strong>{leadInfo?.user?.role}</strong>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">
                Programme: <strong>{leadInfo?.team?.name}</strong>{" "}
              </span>
            </p>

            {/* Push button to bottom */}
            <div className="mt-auto">
              <button
                onClick={() => navigate("/attendance")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors duration-200"
              >
                Mark Attendance
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <div className="w-full md:w-[90%] bg-white min-h-[100px] border border-gray-200 shadow-md rounded-xl p-6">
            <h1 className="text-xl font-semibold mb-4">
              Assign School to User
            </h1>

            <div className="flex items-center gap-4 w-full">
              {/* User Select */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                onChange={(e) => setUser(e.target.value)}
              >
                <option value="" disabled>
                  Select User
                </option>
                {teamInfo.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>

              {/* School Select */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                onChange={(e) => setSchool(e.target.value)}
              >
                <option value="" disabled>
                  Select School
                </option>
                {schoolInfo.map((school) => (
                  <option key={school._id} value={school.schoolName}>
                    {school.schoolName}, {school.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              onClick={assignSchool}
              className="text-white bg-black px-4 py-2 rounded-lg mt-4 hover:bg-gray-800 transition-colors duration-200"
            >
              Assign School
            </button>
          </div>

          <div className="w-full md:w-[90%] bg-white min-h-[300px] border border-gray-200 shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Team Members
            </h2>

            {teamInfo.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamInfo.map((member) => (
                  <div
                    key={member._id}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-gray-500">{member.email}</p>
                    <p className="text-gray-500">
                      Associated Center :{" "}
                      <span className="">
                        {member.associatedCenter
                          ? member.associatedCenter
                          : "None"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No team members yet. Add some using the form above.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


