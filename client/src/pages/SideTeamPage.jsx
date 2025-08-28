import React, { useEffect, useState } from 'react'
import { useSideTeamStore } from '../store/sideTeam';
import { Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';


export const SideTeamPage = () => {
  const { createTeam, fetchTeam, teamInfo, deleteTeam } = useSideTeamStore();
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(false)
  const handleCreateTeam = async () => {
    if (!team || !team.trim()) {
      toast("Team Name is required....")
      return;
    }
    setLoading(true);
    try {
      await createTeam({ teamName: team });
      await fetchTeam();
      setTeam("");
      
    } catch (err) {
      console.error("Error creating team:", err);
    }
    setLoading(false);
    toast("Side Team created")
  };
  useEffect(() => {
    fetchTeam()
  }, [])
  
  console.log(teamInfo)

  return (
    <>
      <div>
        <div className="flex flex-col justify-center w-[80%] p-3">
          <h1 className="font-bold text-4xl">Teams Management</h1>
          <p className="mt-3 text-gray-800">
            Manage main teams and side teams separately
          </p>

          <div className="flex items-center gap-3 mt-4">
            <input
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-[60%] p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter Team Name"
              type="text"
            />

            <button
              onClick={handleCreateTeam}
              disabled={loading}
              className="px-4 py-2 bg-green-400 hover:bg-green-500 text-black font-medium rounded-md shadow
              disabled:bg-gray-300 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <div className="flex items-center ">
                    <Loader2 className="animate-spin w-4 h-3" />
                    Creating...
                  </div>
                </>
              ) : (
                "Create Team"
              )}
            </button>
          </div>
        </div>
        <div className="p-3 grid grid-cols-4 gap-4">
          {teamInfo.map((team) => (
            <div className="flex flex-col border border-gray-300 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300     justify-center  ">
              <div className="flex justify-end">
                <div
                  onClick={async () => {
                    await deleteTeam(team._id);
                    await fetchTeam(); 
                     
                  }}
                  className="p-1 hover:scale-125 transition-transform duration-300 cursor-pointer"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
              </div>

              <h1>Name: {team.name}</h1>
              <p className="text-gray-500">Members : {team.members.length}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
