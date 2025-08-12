import { MainTeam } from "../models/mainTeam.model.js";
import { User } from "../models/user.model.js";

export const teamLeaderInfo = async (req, res) => {
    const userId = req.user;
    
    try {
        console.log(userId)
        const user = await User.findById(userId.userId);
        const team = await MainTeam.findOne({
            leader: userId.userId
            
        }).select("name");
        res.status(201).json({
            user,
            team
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            
            message:"error",
         
        })
        
    }
}

export const teamInfo = async (req, res) => {
    const userId = req.user.userId;

    if (!userId) {
        return res.status(401).json({
            message: "Invalid request"
        });
    }

    try {
        const team = await MainTeam.findOne({ leader: userId }).populate("members","name email classes associatedCenter")

        if (!team) {
            return res.status(404).json({
                message: "Team not found"
            });
        }

        res.status(200).json({ members: team.members });

    } catch (error) {
        console.error("Error fetching team info:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};
