import { School } from "../models/school.model.js";
import { User } from "../models/user.model.js";
import { TeamAssignment } from "../models/TeamAssignment.js";
import { MainTeam } from "../models/mainTeam.model.js";

export const createAssignment = async (req,res)=>{
    const {schoolName,teamName,userIds}=req.body;
    const createdBy=req.user._id

    try {
        if(!schoolName||!teamName||userIds){
            return res.status(400).json({
                message:"invalid fields"
            })
        }
    
        const school = await School.findOne({schoolName})
    
        if(!school){
            return res.status(404).json({
                message:"invalid fields"
            })
        }
    
        const users = await User.find({_id:{$in:userIds}})
        if(users.length!==userIds.length){
            return res.status(400).jsomn({
                message:"db error"
            })
        }
    
        const assignment = new TeamAssignment({
            team:teamName,
            school:school._id,
            students:userIds,
            createdBy
        })
    
        await assignment.save()
    
    
        const populated = await assignment.populate([
            {path:"school",select:"schoolName location"},
            {path:"students",select:"name email"},
            {path:"createdBy",select:"name role email"}
        ]);
    
        return res.status(201).json({
            message:"Team assigned successfully",
            assignment:populated
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
    
}

export const getAssignment = async (req,res)=>{
    const {teamName}=req.params;

    const allowedTeams=["Netritva","DigiExplore","Akshar"];

    if(!allowedTeams.includes(teamName)){
        return res.status(400).json({
            message:"invalid team Nam"
        })
    }

    const assignment = await TeamAssignment.find({teamName})
    .populate("school","schoolName location")
    .populate("students","name email")
    .populate("createdBy","name role email")

    if(!assignment){
        return res.status(404).json({
            message:"no assignment found"
        })
    }


}



export const loadMembers = async (req, res) => {
  const { teamName, year } = req.body;

  try {
    if (!teamName || !year) {
      return res.status(400).json({ message: "teamName and year are required" });
    }

    const teams = await MainTeam.find({ name: teamName, batch: year })
      .populate("members", "name email associatedCenter")
      .populate("leader", "name email associatedCenter")
    

    if (!teams || teams.length === 0) {
      return res
        .status(404)
        .json({ message: `No team found for ${teamName} in batch ${year}` });
    }

    
    const members = [];
    teams.forEach(team => {
      team.members.forEach(m => {
        if (!members.find(x => x._id.equals(m._id))) {
          members.push(m);
        }
      });
    });

    res.status(200).json({
      teamName,
      batch: year,
        
      leader: teams.map(t => t.leader),
      members
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

