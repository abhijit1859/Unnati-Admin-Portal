import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usehandleTeam } from "../store/handleTeam";
import { User as UserIcon ,Pencil} from "lucide-react";

export const EditUserPage = () => {
  const { id } = useParams();
  const { userDetails, removeuserFromTeam, deleteUser } = usehandleTeam();
  const [data, setData] = useState(null);
  const [currTeam, setCurrTeamName] = useState("");
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const resData = await userDetails(id);
      setData(resData);
      setCurrTeamName(resData.team || ""); // Sync dropdown with initial team
    };
    fetchUser();
  }, [id, userDetails]);

  if (!data) return <div>Loading...</div>;

  const { user } = data;

  return (
    <div className="w-full min-h-screen p-3">
      <h1 className="text-3xl font-bold m-4">Member Dashboard</h1>
      <p className="m-4">Track all your teams</p>

      <div className="flex items-stretch gap-4 m-4">
        <div className="w-[40%] flex flex-col gap-4">
          {/* Profile Box */}
          <div className="border border-gray-300 rounded-lg p-6 space-y-6 shadow-sm bg-white flex-1">
            <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
              <UserIcon className="w-5 h-5" />
              <span>Profile</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h3 className="text-lg font-bold text-gray-800">{user?.name}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="text-base font-medium text-gray-800">
                {user?.email}
              </h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <h3 className="text-base font-medium text-gray-800">
                {user?.role}
              </h3>
            </div>

            <div>
              <button
                onClick={() => {
                  deleteUser(id);
                  navigate("/admin");
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition-all duration-200"
              >
                Remove from Unnati
              </button>
            </div>
          </div>

          {/* Current Teams Box */}
          <div className="border border-gray-300 rounded-lg p-6 space-y-6 shadow-sm bg-white flex-1">
            <div className="flex items-center gap-2 text-xl font-semibold border-b pb-2">
              <UserIcon className="w-5 h-5" />
              <span>Current Team</span>
            </div>

            <div className="mt-2">
              {!isEditingTeam ? (
                <div className="flex justify-between items-center">
                  {currTeam ? (
                    <p className="text-gray-700">
                      <span className="font-semibold">Team:</span> {currTeam}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No team found</p>
                  )}
                  <button
                    onClick={() => setIsEditingTeam(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Edit Team"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="teamSelect"
                    className="font-semibold text-gray-700"
                  >
                    Team:
                  </label>
                  <select
                    id="teamSelect"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={currTeam}
                    onChange={(e) => {
                      const selectedTeam = e.target.value;
                      setCurrTeamName(selectedTeam);
                      setIsEditingTeam(false);
                    }}
                  >
                    <option value="" disabled>
                      Select a team
                    </option>
                    <option value="DigiExplore">DigiExplore</option>
                    <option value="Netritva">Netritva</option>
                    <option value="Akshar">Akshar</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side 60% - placeholder for other UI */}
        <div className="w-[60%]">{/* Add more content here if needed */}</div>
      </div>
    </div>
  );
};
