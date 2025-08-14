import { joinRequest } from "../models/request.model.js";
import { SideTeam } from "../models/sideTeam.model.js";
import { User } from "../models/user.model.js";
import {MainTeam} from "../models/mainTeam.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { teamInfo } from "./teamLeader.controllers.js";
 

export const joinTeam = async (req, res) => {
    const { userId, mainTeam: mainTeamName } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { associated_program: mainTeamName },  // ✅ FIXED
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        console.log(user);

        res.status(200).json({
            success: true,
            message: `${user.name} registered in ${user.associated_program}`,
        });
    } catch (error) {
        console.error("Join Team Error:", error);
        res.status(500).json({
            message: "Server error: failed to register",
        });
    }
};




export const addSideTeam = async (req, res) => {
    const { name } = req.body;
    if (!name && name.trim() === "") {
        return res.status(400).json({
            message:"Team name is Required"
        })

      
    }
    try {
        const existingTeam = await SideTeam.findOne({ name: name.trim() });
        if (existingTeam) {
            return res.status(409).json({ message: "Team already exists" });
        }

        const newTeam = new SideTeam({
            name: name.trim()
        })
        await newTeam.save()

        res.status(200).json({
            message: `${name} got created`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "failed to add side team"
        })

    }
}
 

export const joinSideTeam = async (req, res) => {
    const { userId, sideTeamName } = req.body;

    try {
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.associated_program)
     
        if (!user.associated_program) {
            return res.status(400).json({ message: "User must be in a main team first" });
        }

      
        const sideTeam = await SideTeam.findOne({ name: sideTeamName });
        if (!sideTeam) {
            return res.status(404).json({ message: "Side team not found" });
        }

        
        if (!sideTeam.members.includes(user._id)) {
            sideTeam.members.push(user._id);
            await sideTeam.save();
        }
 
        if (!user.sideTeams.includes(sideTeam._id)) {
            user.sideTeams.push(sideTeam._id);
            await user.save();
        }

        return res.status(200).json({ message: "User successfully joined the side team." });
    } catch (error) {
        console.error("Join side team error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


 

const allowedTeams = ["Netritva", "DigiExplore", "Akshar"];

export const requestToJoinTeam = async (req, res) => {
    const { teamName } = req.body;
    const userId = req.user.userId;

    if (!teamName) {
        return res.status(400).json({ message: "teamName is required" });
    }

    if (!allowedTeams.includes(teamName)) {
        return res.status(400).json({ message: "Invalid team name" });
    }

    try {
        let team = await MainTeam.findOne({ name: teamName });

        // If team doesn't exist, create it
        if (!team) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const currentYear = new Date().getFullYear();

            team = await MainTeam.create({
                name: teamName,
                leader: user._id,
                batch: currentYear,
                members: [user._id],
            });

            return res.status(201).json({
                message: `Team '${teamName}' created successfully and you are the leader.`,
                team,
            });
        }

        // Check if user has already sent a join request
        const alreadyRequested = await joinRequest.findOne({
            requester: userId,
            team: team._id,
        });

        if (alreadyRequested) {
            return res.status(400).json({ message: "Join request already sent" });
        }

        // Create the join request
        await joinRequest.create({
            requester: userId,
            team: team._id,
        });

        res.status(201).json({
            message: "Join request sent",
        });
    } catch (error) {
        console.error("Error in requestToJoinTeam:", error);
        res.status(500).json({
            message: "Server error",
        });
    }
};


export const getJoinRequests = async (req, res) => {
    const user = req.user;
    

    try {
        let requests;

        if (user.role === "LEAD") {
            const team = await MainTeam.findOne({ leader: user._id });
            if (!team) return res.status(403).json({ message: "Not a team lead" });

            requests = await joinRequest.find({ team: team._id, status: "pending" })
                .populate("requester", "name email")
                .populate("team", "name");
        } else if (user.role === "ADMIN") {
            requests = await joinRequest.find({ status: "pending" })
                .populate("requester", "name email")
                .populate("team", "name");
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }
        console.log(requests)

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const handleJoinRequest = async (req, res) => {
    const { requestId, action } = req.body;
    const user = req.user;
    try {
        const request = await  joinRequest.findById(requestId)

        if (!joinRequest) return res.status(404).json({ message: "Not found" });
        console.log(request)

        const team = request.team
        console.log(team._id)

        if (user.role !== 'ADMIN') {

            
            return res.status(403).json({message:unauthorized})
        }

        if (action === "accept") {
            await MainTeam.findByIdAndUpdate(team._id, {
                $push: { members: request.requester }
            }, { new: true });


            request.status ="accepted"
        } else if (action === "declined") {
            request.status="declined"
        }
        await request.save();  
        res.status(200).json({ message: `Request ${action}ed` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




export const getAllUserDetails = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select("name email role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const team = await MainTeam.findOne({
            $or: [{ leader: userId }, { members: userId }],
        }).select("name"); 

        res.status(200).json({
            user,
            team: team ? team.name : null,
        });
    } catch (error) {
        console.log(error)
        
    }
}




 

export const changeMainTeam = async (req, res) => {
    const { id, teamName } = req.body;

    try {
        
         

       
        await MainTeam.updateMany(
            { members: id },
            { $pull: { members: id } }
        );

      
        const newTeam = await MainTeam.findOneAndUpdate(
            { name: teamName },
            { $addToSet: { members: id } },
            { new: true }
        );

        if (!newTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

     
        
        res.status(200).json({
            message: "Team changed successfully :)",
            team: newTeam.name,
            
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



export const getTeamInfo = async (req, res) => {
    const { teamName } = req.body;

    try {
        const team = await MainTeam.findOne({ name: teamName })
            
            .populate("members", "name email classes  associatedCenter");  
        if (!team) {
            return res.status(404).json({
                message: "Invalid team"
            });
        }

        res.status(200).json({
            team
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
