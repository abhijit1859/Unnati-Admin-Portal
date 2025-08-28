import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "teamType",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending",
    },
    teamType: {
        type: String,
        required:true
    }
});

export const joinRequest = mongoose.model("JoinRequest", joinRequestSchema);
