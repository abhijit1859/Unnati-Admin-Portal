import { School } from "../models/school.model.js";
import { User } from "../models/user.model.js";

// Add a new center
export const addCenter = async (req, res) => {
  const { schoolName, location, team } = req.body;

  if (!schoolName?.trim() || !location?.trim()) {
    return res.status(400).json({ message: "Invalid details" });
  }

  try {
 
    const existingCenter = await School.findOne({ schoolName });
    if (existingCenter) {
      return res.status(400).json({ message: "Center already exists" });
    }

    const newSchool = new School({ schoolName, location, team });
    await newSchool.save();

    res.status(201).json({
      message: "New school added",
      school: newSchool
    });
  } catch (error) {
    console.error("AddCenter error:", error);
    res.status(500).json({ message: "Error creating school" });
  }
};

// Display all centers
export const displayCenter = async (req, res) => {
  try {
    const centers = await School.find();
    res.status(200).json({ centers });
  } catch (error) {
    console.error("DisplayCenter error:", error);
    res.status(500).json({ message: "Failed to fetch centers" });
  }
};

// Delete a center
export const deleteSchool = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Invalid center ID" });
  }

  try {
    const center = await School.findByIdAndDelete(id);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
 
    await User.updateMany({ associatedCenter: center.schoolName }, { $unset: { associatedCenter: "" } });

    res.status(200).json({
      message: "Center deleted successfully",
      center
    });
  } catch (error) {
    console.error("DeleteSchool error:", error);
    res.status(500).json({ message: "Failed to delete center" });
  }
};

// Assign a user to a center
export const assignSchoolToUser = async (req, res) => {
  const { userId, centerName } = req.body;

  if (!userId?.trim() || !centerName?.trim()) {
    return res.status(400).json({ message: "Invalid details" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.associatedCenter) {
      return res.status(400).json({ message: "User is already registered in a center" });
    }

    const center = await School.findOne({ schoolName: centerName });
    if (!center) {
      return res.status(404).json({ message: "Invalid center name" });
    }
 
    user.associatedCenter = centerName;
    await user.save();

    center.assignedUsers.push(userId);
    await center.save();

    res.status(200).json({ message: "User successfully assigned to a center" });
  } catch (error) {
    console.error("AssignSchoolToUser error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
