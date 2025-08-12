import mongoose, { mongo } from 'mongoose'

const sideTeamSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    leader: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

export const SideTeam = mongoose.model("SideTeam", sideTeamSchema)
