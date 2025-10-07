import {
  ShieldUser,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { usehandleTeam } from "../store/handleTeam";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Logout } from "../components/Logout";

export const AdminPage = () => {
  const navigate = useNavigate();
  const { getJoinRequest, requests, handleJoinRequest, getAllDetails } =
    usehandleTeam();

  const [userData, setUserData] = useState([]);
  const [team, setTeam] = useState("");
  const [localRequests, setLocalRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("MainTeam");

  const [isOpen, setIsOpen] = useState(true); // sidebar open by default

  const getUserData = async () => {
    const data = await getAllDetails();
    setUserData(data);
  };

  useEffect(() => {
    getJoinRequest();
    getUserData();
  }, []);

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const approve = () => toast.success("User request accepted");
  const deny = () => toast.error("User request declined");

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar isOpen={isOpen} />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
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
          <Logout />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <ShieldUser className="w-10 h-10 text-green-500" />
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="flex gap-6">
          {/* Pending Requests */}
          <div className="bg-[#FEFAF5] border border-gray-300 rounded-2xl shadow-md w-1/2 p-6 flex flex-col overflow-y-auto max-h-[500px]">
            <h2 className="text-lg font-semibold mb-3">Pending Requests</h2>

            <div className="flex bg-gray-200 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab("MainTeam")}
                className={`w-1/2 px-2 py-1 rounded-lg transition ${
                  activeTab === "MainTeam"
                    ? "bg-white text-gray-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Main Team
              </button>
              <button
                onClick={() => setActiveTab("SideTeam")}
                className={`w-1/2 px-2 py-1 rounded-lg transition ${
                  activeTab === "SideTeam"
                    ? "bg-white text-gray-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Side Team
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {localRequests.filter(
                (req) =>
                  req.status === "pending" && req.teamType === activeTab
              ).length === 0 ? (
                <p className="text-center text-gray-500">No pending requests...</p>
              ) : (
                localRequests
                  .filter(
                    (req) =>
                      req.status === "pending" && req.teamType === activeTab
                  )
                  .map((req) => (
                    <div
                      key={req._id}
                      className="w-full border border-gray-300 rounded-2xl shadow-sm p-4"
                    >
                      <h3 className="font-semibold text-gray-900">{req.requester.name}</h3>
                      <p className="text-gray-700">
                        <strong>Programme:</strong> {req.team.name}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => {
                            handleJoinRequest({
                              requestId: req._id,
                              action: "accept",
                            });
                            approve();
                            setLocalRequests(
                              localRequests.filter((r) => r._id !== req._id)
                            );
                          }}
                          className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleJoinRequest({
                              requestId: req._id,
                              action: "declined",
                            });
                            deny();
                            setLocalRequests(
                              localRequests.filter((r) => r._id !== req._id)
                            );
                          }}
                          className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Team Member Management */}
          <div className="bg-[#FEFAF5] border border-gray-300 rounded-2xl shadow-md w-1/2 p-6 flex flex-col overflow-y-auto max-h-[500px]">
            <h2 className="text-2xl font-semibold mb-4">Team Member Management</h2>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              defaultValue=""
              onChange={(e) => setTeam(e.target.value)}
            >
              <option value="" disabled>
                Select a team
              </option>
              <option value="DigiExplore">DigiExplore</option>
              <option value="Netritva">Netritva</option>
              <option value="Akshar">Akshar</option>
            </select>

            <div className="flex flex-col gap-3">
              {userData
                ?.filter((t) => t.name === team)
                ?.flatMap((t) => t.members)
                ?.map((member) => (
                  <div
                    key={member._id}
                    className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/edit-user/${member._id}`)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
