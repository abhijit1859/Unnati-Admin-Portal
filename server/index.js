import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
 
import cookieParser from 'cookie-parser';
 
import cors from "cors"
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js';
import userRoutes from './routes/user.routes.js';
 import attendanceRoute from './routes/attendance.routes.js';
import leadRoutes from './routes/teamLead.routes.js';
import centerRoutes from './routes/school.routes.js';
import sideTeamRoutes from './routes/sideTeam.routes.js';
import leaderBoardRoutes from './routes/leaderBoard.routes.js';
import assignmentRoutes from './routes/teamAssignment.routes.js';
 
dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://10.16.4.108:5173",
        "http://localhost:5173",
        "https://unnati-frontend.vercel.app"
    ],
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
}));
// Handle preflight
app.options('*', cors({
    origin: [
        "http://10.16.4.108:5173",
        "http://localhost:5173",
        "https://unnati-frontend.vercel.app"
    ],
    credentials: true
}));

 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/team", teamRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/attendance", attendanceRoute)
app.use("/api/v1/lead", leadRoutes)
app.use("/api/v1/center", centerRoutes)
app.use("/api/v1/sideTeam", sideTeamRoutes)
app.use("/api/v1/leader-board",leaderBoardRoutes)
app.use("/api/v1/team-assignment",assignmentRoutes)

connectDB();

 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is up and running on 0.0.0.0:${PORT}`);
});
