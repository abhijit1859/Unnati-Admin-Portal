import { ShieldUser } from "lucide-react";
import React, { useEffect } from "react";
import { usehandleTeam } from "../store/handleTeam";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const navigate=useNavigate()
  const { getJoinRequest, requests, handleJoinRequest, getAllDetails } =
    usehandleTeam();
  
  const [userData, setUserData] = useState([])
  const [team,setTeam]=useState("")
  const getUserData = async () => {
    const data = await getAllDetails();
    setUserData(data)
  }

  useEffect(() => {
    getJoinRequest();
    getUserData()
    
  }, []);
  console.log(requests)
  console.log(team)

  const approve = () => toast("User request accepted")
  const deny = () => toast("User request declined")
  console.log("---->",userData)

  return (
    <div className="p-5">
      <div className="flex items-center gap-3 p-5">
        <ShieldUser className="w-10 h-10 text-green-500" />
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <br /><br />
        <button onClick={() => navigate("/attendance")}
        className="bg-white border border-gray-300 shadow-lg  rounded-lg p-3 hover:bg-gray-200 transition-shadow"
        >Mark Attendance</button>
      </div>

      <div className="flex gap-5 mt-5 items-center">
        <div className="bg-white border border-gray-300 w-[50%] h-[500px] rounded-lg shadow-md p-4 flex flex-col overflow-y-auto">
          <div className="m-3">
            <h1 className="text-lg font-semibold">Pending Requests:</h1>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {requests.filter((request) => request.status === "pending")
              .length === 0 ? (
              <div className="text-center flex items-center justify-center text-gray-500">
                No pending requests...
              </div>
            ) : (
              requests
                .filter((request) => request.status === "pending")
                .map((request) => (
                  <div
                    key={request._id}
                    className="w-[80%] border border-gray-500 shadow-lg rounded-lg p-3"
                  >
                    <h1 className="font-bold">{request.requester.name}</h1>
                    <p>
                      <strong>Programme:</strong> {request.team.name}
                    </p>
                    <div className="flex items-center justify-center gap-3 m-3">
                      <button
                        onClick={() => {
                          handleJoinRequest({
                            requestId: request._id,
                            action: "accept",
                          });
                          approve();
                        }}
                        className="w-[50%] bg-green-400 p-1 rounded-lg cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleJoinRequest({
                            requestId: request._id,
                            action: "declined",
                          });
                          deny();
                        }}
                        className="w-[50%] bg-red-400 p-1 rounded-lg cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        <div className="bg-white border border-gray-300 w-[50%] h-[500px] rounded-lg shadow-md p-4 flex flex-col overflow-y-auto">
          <h1 className="text-2xl font-semibold p-4">Team Member management</h1>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue=""
            onClick={(e) => setTeam(e.target.value)}
          >
            <option value="" disabled>
              Select a team
            </option>
            <option value="DigiExplore">DigiExplore</option>
            <option value="Netritva">Netritva</option>
            <option value="Akshar">Akshar</option>
          </select>
          <div className="mt-4">
            {userData
              ?.filter((t) => t.name === team)
              ?.flatMap((t) => t.members)
              ?.map((member) => (
                <div
                  key={member._id}
                  className="p-3 border rounded-md shadow-sm bg-gray-100 my-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/edit-user/${member._id}`)}
                    className="px-3 py-1 bg-green-400 text-white rounded hover:bg-green-900"
                  >
                    Edit User
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
