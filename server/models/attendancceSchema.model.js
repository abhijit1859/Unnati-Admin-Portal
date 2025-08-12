import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    team: {
        type: String,
        enum: ["Netritva", "DigiXplore", "Akshar"],
        required: true,  
    },
    date: {
        type: Date,
        default: Date.now,  
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
    },
    inTime: {
        type: Date,
        required:true
    },
    outTime: {
        type: Date,
        required:true
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
