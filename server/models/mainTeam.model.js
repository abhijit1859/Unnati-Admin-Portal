import mongoose from 'mongoose'

const mainTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["Netritva", "DigiExplore", "Akshar"],
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    batch: {
        type: Number,
        required:true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

export const MainTeam = mongoose.model("MainTeam", mainTeamSchema);
