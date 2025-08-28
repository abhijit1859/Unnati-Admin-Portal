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

export const displaySideTeam = async (req, res) => {
    try {
        const teams = await SideTeam.find();
        res.status(201).json({
            teams
        })
    } catch (error) {
        console.log(error)
    }
    
}


export const editSideteam = async (req, res) => {
    const { id, teamName } = req.body;

    if (!id || !teamName) {
        return res.status(400).json({ message: "ID and team name are required" });
    }

    try {
        const updatedTeam = await SideTeam.findByIdAndUpdate(
            id,
            { name: teamName },
            { new: true }  
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        return res.status(200).json({ message: "Team updated successfully", updatedTeam });
    } catch (error) {
        console.error("Error updating team:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteSideTeam = async (req, res) => {
    const { id } = req.body;
    

    if (!id) {
        return res.status(400).json({ message: "Team ID is required" });
    }

    try {
        const deletedTeam = await SideTeam.findByIdAndDelete(id);

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        return res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
