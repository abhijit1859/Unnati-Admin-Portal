import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kumarabhijit936:1234@cluster0.jgy9wjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
        console.log("connected to db")
        })
        .catch(() => {
        console.log("error in connection")
    })
}

export default connectDB 