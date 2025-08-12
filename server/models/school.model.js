import mongoose from 'mongoose'

const schoolSchema = await mongoose.Schema({
    schoolName: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    team: {
        type: String,
        enum: ["Netritva", "DigiExplore", "Akshar"] 
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
}, { timeStamps: true })

export const School = mongoose.model("School",schoolSchema)