import { SideTeam } from "../models/sideTeam.model.js";

export const createSideTeam = async (req, res) => {
    const { teamName } = req.body;
    try {
        const newTeam = await SideTeam.create({ name: teamName });
        res.status(201).json({
            message:"side team created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({
            message:"Server error"
        })
        
    }
}

export const joinSideTeam = async (req, res) => {
    const { teamName } = req.body;
    try {
        if (!teamName) {
            return res.status(401).json({
                message:"invalid teamName"
            })

        }

        const team = await SideTeam.findOneAndUpdate({teamName},{})
    } catch (error) {
        
    }
}

