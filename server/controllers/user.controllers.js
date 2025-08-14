 
import { joinRequest } from "../models/request.model.js";
import { SideTeam } from "../models/sideTeam.model.js";
import { User } from "../models/user.model.js";
import { MainTeam } from "../models/mainTeam.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



export const getDetailsByTeamName = async (req, res) => {
 
    try {
        const team = await MainTeam.find()
            .populate("leader")         
            .populate("members"); 
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({
            message: "Team details fetched successfully",
            data: team,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching team details",
            error: error.message,
        });
    }
};

export const sendUserDetails = async (req, res) => {
 
    const {userId}= req.body;

    try {
        
        const user = await User.findById(userId).select("name email role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

    
        const team = await MainTeam.findOne({
            $or: [{ leader: userId }, { members: userId }],
        }).select("name");   

        res.status(200).json({
            message: "User details fetched successfully",
            data: {
                user,
                team: team ? team.name : null,  
            },
        });
    } catch (error) {
        console.error("Error fetching user/team:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const removeFromMainTeam = async (req, res) => {
    const { userId, teamName } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message:"user not found"
            })
        }
        console.log(user)
        const team = await MainTeam.findOne({name:teamName})
        if (!team) {
            return res.status(401).json({
                message:"team not found"
            })
        }
        team.members.pull(userId);  
        await team.save();

        res.status(200).json({
            message: "user removed from team",
            team
        });

        res.status(201).json({user,team})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"error"
        })
        
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await MainTeam.updateMany(
            { members: id },
            { $pull: { members: id } }
        )
        await MainTeam.updateMany({
            leader: id
        },
            {
                $unset: { leader: "" }
            })
        res.status(200).json({
            message: "User deleted from DB",
            deletedUser: user
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}