import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { usehandleTeam } from "../store/handleTeam";
import { User, Users } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSideTeamStore } from "../store/sideTeam";
import { Logout } from "../components/Logout";

export const UserPage = () => {
  const [teamName, setTeamName] = useState("");
  const [requested, setIsRequested] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const { authUser, logoutUser } = useAuthStore();
  const { requestTojoinTeam, userDetails } = usehandleTeam();
  const [data, setData] = useState([]);

  const { fetchTeam ,teamInfo} = useSideTeamStore();

  const handleRequest = async (teamType) => {
    setIsLoading(true);
    try {
      await requestTojoinTeam({ teamName:teamName,teamType:teamType });
      setIsRequested(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const id = await authUser._id;
      const info = await userDetails(id);
      setData(info);
      console.log("Details:", info);
      await fetchTeam()
    };
    fetch();
   
  }, []);
  const navigate = useNavigate()
   
  return (
    <div className="w-full min-h-screen p-3">
      <h1 className="text-3xl font-bold m-4">Member Dashboard</h1>
      <div className="flex  justify-between items-center">
        <p className="m-4">Track all your teams</p>
        <Logout/>
      </div>

      
      <div className="flex items-stretch gap-4 m-4">
        <div className="w-[40%] flex flex-col gap-4">
          {/* Profile Box */}
          <div className="border border-gray-300 rounded-lg p-6 space-y-6 shadow-sm bg-white flex-1">
            <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h3 className="text-lg font-bold text-gray-800">
                {authUser?.name}
              </h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="text-base font-medium text-gray-800">
                {authUser?.email}
              </h3>
            </div>
          </div>

          {/* Current Teams Box */}
          <div className="border border-gray-300 rounded-lg p-6 space-y-6 shadow-sm bg-white flex-1">
            <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
              <Users className="w-5 h-5" />
              <span>Current Team</span>
            </div>
            <div>
              {data["team"] ? (
                <p>
                  <strong>Programme:</strong> {data["team"]}
                </p>
              ) : (
                <p>No team found</p>
              )}
            </div>
            <div></div>
          </div>
        </div>

        {/* Right 60% */}
        <div className="w-full md:w-[60%] flex flex-col">
          <div className="border border-gray-300 rounded-lg p-6 space-y-8 shadow-sm bg-white h-full">
            {/* Join a Team */}
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-green-500 text-center">
                Join a Team
              </h1>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue=""
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
                className={`px-4 py-2 text-white font-medium rounded-md w-full transition-all duration-200 ${
                  requested || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Sending Request..."
                  : requested
                  ? "Request Sent"
                  : "Request to Join"}
              </button>
            </div>

            {/* Join a Department */}
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-green-500 text-center">
                Join a Department
              </h1>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue=""
                onChange={(e) => setTeamName(e.target.value)}
              >
                <option value="" disabled>
                  Select a department
                </option>

                {teamInfo.map((team) => (
                  <option value={team.name}>{team.name}</option>
                ))}
              </select>
              <button
                onClick={() => handleRequest("SideTeam")}
                className={`px-4 py-2 text-white font-medium rounded-md w-full transition-all duration-200 ${
                  requested || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Sending Request..."
                  : requested
                  ? "Request Sent"
                  : "Request to Join"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
