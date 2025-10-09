import React from 'react'
import { useLeadInfoStore } from '../store/lead';
import { useEffect } from 'react';
import api from '../lib/axios';
import { useState } from 'react';
import { ColumnsSettingsIcon, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { usehandleTeam } from '../store/handleTeam';
import { useCenterStore } from '../store/school';
import { Logout } from '../components/Logout';

export const LeadsPage = () => {
  const { getLeadInfo, leadInfo } = useLeadInfoStore()
  const [teamInfo, setTeamInfo] = useState([])
  const [schoolInfo, setSchoolInfo] = useState([])
  const [school, setSchool] = useState("");
  const [user, setUser] = useState("")
  const navigate = useNavigate() 

  const {centerList,list} = useCenterStore()


  useEffect(() => { getLeadInfo() }, [])



  
  const getMembersList = async () => {
    try {
     const res = await api.get(
       "/lead/team-info"
     );
     
      setTeamInfo(res.data.members)
 
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() => {
    getMembersList()
    
  }, [])

  const assignSchool = async () => {
    try {
      const res = await api.post(
        "/center/assign-center",
        { userId: user, centerName: school }
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
 
  const { getJoinRequest, requests, handleJoinRequest, getAllDetails } =
    usehandleTeam();

  const [userData, setUserData] = useState([]);
  const [team, setTeam] = useState("");
  const getUserData = async () => {
    const data = await getAllDetails();
    setUserData(data);
  };

  useEffect(() => {
    getJoinRequest();
    getUserData();
    centerList()
  }, []);
  console.log(requests);
  console.log(team);

  const approve = () => toast("User request accepted");
  const deny = () => toast("User request declined");
 


  console.log("list : " , list)
  
 
  return (
    <>
      <div className="p-8 bg-[#FDFCFC] min-h-screen space-y-10">
        <div className="flex justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-1">
              Team Management
            </h1>
            <p className="text-gray-500">Welcome back {leadInfo?.user?.name}</p>
          </div>
          <Logout />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Member */}
          <div className="bg-[#FEFAF5] border border-gray-200 shadow-md rounded-xl p-6 space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">
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
                  className="border bg-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-[#F0B56F] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#F2A060] transition-all duration-200 w-full"
              >
                Add Member
              </button>
            </form>
          </div>

          <div className="bg-[#FEFAF5] border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Team Overview
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Total Members: </span> 0
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Your Role: </span>
                <strong>{leadInfo?.user?.role}</strong>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Programme: </span>
                <strong>{leadInfo?.team?.name}</strong>
              </p>
            </div>
            <button
              onClick={() => navigate("/attendance")}
              className="bg-[#F0B56F] hover:[#F2A060] text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 mt-6"
            >
              Mark Attendance
            </button>
          </div>
        </div>

        <div className="bg-[#FEFAF5] border border-gray-200 shadow-md rounded-xl p-6 space-y-4">
          <h1 className="text-xl font-semibold">Assign School to User</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="border bg-white border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border bg-white border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="" disabled>
                Select School
              </option>
              {list.map((school) => (
                <option key={school._id} value={school.schoolName}>
                  {school.schoolName}, {school.location}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={assignSchool}
            className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Assign School
          </button>
        </div>

        {/* Team Members */}
        <div className="bg-[#FEFAF5] border border-gray-200 shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Team Members
          </h2>
          {teamInfo.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamInfo.map((member) => (
                <div
                  key={member._id}
                  className="border bg-white border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-500">{member.email}</p>
                  <p className="text-gray-500">
                    Associated Center:{" "}
                    <span>{member.associatedCenter || "None"}</span>
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

        {/* Pending Requests */}
      </div>
    </>
  );
}


