import { Attendance } from "../models/attendancceSchema.model.js";
import { MainTeam } from "../models/mainTeam.model.js";
import { User } from "../models/user.model.js";

export const attendance = async (req, res) => {
    const markedBy = req.user.id;
    const { teamName, userIds,inTime,outTime } = req.body;
    
    
    if (!teamName || !Array.isArray(userIds)) {
        return res.status(400).json({
            message:"invalid request"
        })
    }

    try {
        for (const userId of userIds) {
            await Attendance.create({
                user: userId,
                team: teamName,
                status: "Present",
                markedBy: markedBy,
                inTime:inTime,
                outTime:outTime
            })

            await User.findByIdAndUpdate(userId, {
                $inc:{classes:1}
            })
        }
        return res.status(200).json({
            message: "Attendance marked  successfully.",
        });
    } catch (error) {
        console.error("Error in marking attendance:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}

export const sendAttendanceData = async (req, res) => {
     
    const { teamName, batchYear, centerName } = req.body;
    console.log(centerName)
   
    const students = await MainTeam.aggregate([
        {
            $match: {
                name: teamName,
                batch: batchYear
            }
        },
        { $unwind: "$members" },
        {
            $lookup: {
                from: "users",
                localField: "members",
                foreignField: "_id",
                as: "memberDetails"
            }
        },
        { $unwind: "$memberDetails" },

        // ✅ Match centerName after lookup
        {
            $match: {
                "memberDetails.associatedCenter": centerName
            }
        },

        {
            $project: {
                _id: "$memberDetails._id",
                name: "$memberDetails.name",
                email: "$memberDetails.email",
                UnnatiId: "$memberDetails.UnnatiId",
                role: "$memberDetails.role",
                classes: "$memberDetails.classes",
                teamName: "$name",
                batch: "$batch",
                associatedCenter: "$memberDetails.associatedCenter"
            }
        },
        {
            $sort: { associatedCenter: 1 }
        }
    ]);

    res.json({students})

}

 