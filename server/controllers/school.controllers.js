import { Schema } from "mongoose";
import { School } from "../models/school.model.js";
import { User } from "../models/user.model.js";

export const addCenter = async (req, res) => {
    const { schoolName, location, team } = req.body;

    if (!schoolName || !location) {
        return res.status(400).json({
            message: "Invalid details"
        });
    }

    try {
        const newSchool = new School({ schoolName, location, team });
        await newSchool.save();

        res.status(201).json({
            message: "New school added",
            school: newSchool
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating school",
            error: error.message
        });
    }
};

export const displayCenter = async (req, res) => {
    try {
        const centers = await School.find();
        res.status(201).json({centers})
    } catch (error) {
        console.log(error)
    }
}

export const deleteSchool = async (req, res) => {
    const { id } = req.body;
    try {
        const center = await School.findByIdAndDelete(id)
        res.status(201).json({
            message: "center deleted successfully",
            center
        })
    } catch (error) {
        console.log(error)
        
    }
}



export const assignSchoolToaUser = async (req, res) => {
    const { userId, centerName } = req.body;

    try {
   
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

 
        if (user.associatedCenter) {
            return res.status(400).json({
                message: "User is already registered in a center"
            });
        }

 
        user.associatedCenter = centerName;
        await user.save();
 
        const center = await School.findOneAndUpdate(
            { schoolName: centerName },
            { $push: { assignedUsers: userId } },
            { new: true }
        );

        if (!center) {
            return res.status(404).json({
                message: "Invalid center name"
            });
        }

        res.status(201).json({
            message: "User successfully assigned to a center"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
