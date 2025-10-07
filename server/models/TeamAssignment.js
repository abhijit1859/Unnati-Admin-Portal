import mongoose from "mongoose";

const teamAssignmentSchema = new mongoose.Schema({
    team:{
        type:String,
        enum:["Netritva,DigiExplore","Akshar"],
        required:true
    },
    School:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"School",
        required:true
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
         
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})


export const TeamAssignment = mongoose.model("Team Assignment",teamAssignmentSchema)