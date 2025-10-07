import { SideTeam } from "../models/sideTeam.model.js";

// Create a new side team
export const createSideTeam = async (req, res) => {
  const { teamName } = req.body;

  if (!teamName?.trim()) {
    return res.status(400).json({ message: "Team name is required" });
  }

  try {
    // Prevent duplicate team names
    const existingTeam = await SideTeam.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: "Team already exists" });
    }

    const newTeam = await SideTeam.create({ name: teamName.trim() });

    res.status(201).json({
      message: "Side team created successfully",
      team: newTeam
    });
  } catch (error) {
    console.error("CreateSideTeam error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Join a side team
export const joinSideTeam = async (req, res) => {
  const { teamName, userId } = req.body;

  if (!teamName?.trim() || !userId?.trim()) {
    return res.status(400).json({ message: "Invalid teamName or userId" });
  }

  try {
    const team = await SideTeam.findOne({ name: teamName });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Prevent user from joining twice
    if (team.members?.includes(userId)) {
      return res.status(400).json({ message: "User already joined this team" });
    }

    team.members = team.members ? [...team.members, userId] : [userId];
    await team.save();

    res.status(200).json({ message: "User successfully joined the team", team });
  } catch (error) {
    console.error("JoinSideTeam error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Display all side teams
export const displaySideTeam = async (req, res) => {
  try {
    const teams = await SideTeam.find().select("-__v"); // optional: hide __v
    res.status(200).json({ teams });
  } catch (error) {
    console.error("DisplaySideTeam error:", error);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

// Edit a side team
export const editSideteam = async (req, res) => {
  const { id, teamName } = req.body;

  if (!id?.trim() || !teamName?.trim()) {
    return res.status(400).json({ message: "ID and team name are required" });
  }

  try {
    // Prevent duplicate names
    const existingTeam = await SideTeam.findOne({ name: teamName });
    if (existingTeam && existingTeam._id.toString() !== id) {
      return res.status(400).json({ message: "Another team with this name already exists" });
    }

    const updatedTeam = await SideTeam.findByIdAndUpdate(
      id,
      { name: teamName.trim() },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team updated successfully", updatedTeam });
  } catch (error) {
    console.error("EditSideTeam error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a side team
export const deleteSideTeam = async (req, res) => {
  const { id } = req.body;

  if (!id?.trim()) {
    return res.status(400).json({ message: "Team ID is required" });
  }

  try {
    const deletedTeam = await SideTeam.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully", deletedTeam });
  } catch (error) {
    console.error("DeleteSideTeam error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
