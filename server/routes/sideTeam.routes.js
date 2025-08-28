import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { createSideTeam, deleteSideTeam, displaySideTeam } from '../controllers/sideTeam.controllers.js'
const sideTeamRoutes = express.Router()

sideTeamRoutes.post("/create", authMiddleware, createSideTeam)
sideTeamRoutes.get("/display", displaySideTeam)
sideTeamRoutes.post("/delete",deleteSideTeam)


export default sideTeamRoutes