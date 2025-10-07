import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { usehandleTeam } from "../store/handleTeam";
import { User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSideTeamStore } from "../store/sideTeam";
import { Logout } from "../components/Logout";

export const UserPage = () => {
  const [teamName, setTeamName] = useState("");
  const [requested, setIsRequested] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const { authUser } = useAuthStore();
  const { requestTojoinTeam, userDetails } = usehandleTeam();
  const [data, setData] = useState([]);
  const { fetchTeam, teamInfo } = useSideTeamStore();
  const navigate = useNavigate();

  const handleRequest = async (teamType) => {
    setIsLoading(true);
    try {
      await requestTojoinTeam({ teamName, teamType });
      setIsRequested(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const id = authUser?._id;
      if (!id) return;
      const info = await userDetails(id);
      setData(info);
      await fetchTeam();
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Member Dashboard</h1>
        <Logout />
      </div>

      <p className="mb-6 text-gray-600">
        Track all your programs, departments, and team requests.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="flex flex-col gap-6 lg:w-2/5">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b pb-2 text-xl font-semibold text-gray-800">
              <User className="w-6 h-6 text-green-500" />
              <span>Profile</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h3 className="text-lg font-bold text-gray-900">{authUser?.name}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="text-base font-medium text-gray-800">{authUser?.email}</h3>
            </div>
          </div>

          {/* Current Team Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b pb-2 text-xl font-semibold text-gray-800">
              <Users className="w-6 h-6 text-green-500" />
              <span>Current Team</span>
            </div>
            <div>
              {data["team"] ? (
                <p>
                  <strong>Programme:</strong> {data["team"]}
                </p>
              ) : (
                <p className="text-gray-500">No team found</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Join a Team Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-green-500 text-center">
              Join a Team
            </h2>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={requested}
            >
              <option value="" disabled>
                Select a team
              </option>
              <option value="DigiExplore">DigiExplore</option>
              <option value="Netritva">Netritva</option>
              <option value="Akshar">Akshar</option>
            </select>
            <button
              onClick={() => handleRequest("MainTeam")}
              disabled={requested || loading || !teamName}
              className={`w-full py-3 rounded-xl text-white font-medium transition ${
                requested || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending Request..." : requested ? "Request Sent" : "Request to Join"}
            </button>
          </div>

          {/* Join a Department Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-green-500 text-center">
              Join a Department
            </h2>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setTeamName(e.target.value)}
            >
              <option value="" disabled>
                Select a department
              </option>
              {teamInfo.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRequest("SideTeam")}
              className={`w-full py-3 rounded-xl text-white font-medium transition ${
                requested || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending Request..." : requested ? "Request Sent" : "Request to Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
