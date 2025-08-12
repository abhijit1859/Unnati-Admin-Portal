import mongoose from 'mongoose'
 

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["USER", "LEAD", "ADMIN","Co-ordinator","Center-Lead"],
        default: "USER",
    },
    UnnatiId: {
        type: String,
        required:true
    },
    classes: {
        type: Number,
        default:0,
    },
    associatedCenter: {
        type:String,
    }
});


export const User = mongoose.model("User",userSchema)