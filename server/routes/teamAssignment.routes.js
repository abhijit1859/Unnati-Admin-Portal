import express from 'express'
import { createAssignment, loadMembers } from '../controllers/team-assignment.controllers.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js'

const assignmentRoutes = express.Router()

assignmentRoutes.post("/assignment",authMiddleware,createAssignment)
assignmentRoutes.post("/load-members",authMiddleware,loadMembers)


export default assignmentRoutes