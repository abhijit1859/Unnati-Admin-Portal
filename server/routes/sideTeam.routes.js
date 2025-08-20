import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { createSideTeam } from '../controllers/sideTeam.controllers.js'
const sideTeamRoutes = express.Router()

sideTeamRoutes.post("/create", authMiddleware, createSideTeam)


export default sideTeamRoutes