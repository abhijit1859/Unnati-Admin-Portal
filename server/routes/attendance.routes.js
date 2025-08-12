import express from 'express'
import { attendance, sendAttendanceData } from '../controllers/attendance.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const attendanceRoute = express.Router();

attendanceRoute.post("/mark", authMiddleware, attendance)
attendanceRoute.post("/fetchData",authMiddleware,sendAttendanceData)


export default attendanceRoute