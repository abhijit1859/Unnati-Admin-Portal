import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { addSideTeam, changeMainTeam,  getJoinReq,  getJoinRequests, getTeamInfo, handleJoinRequest, joinSideTeam, joinTeam,  requestToJoinTeam  } from '../controllers/team.controllers.js'
import { getDetailsByTeamName } from '../controllers/user.controllers.js'
 
const teamRoutes = express.Router()

teamRoutes.post("/joinTeam", authMiddleware, joinTeam)
teamRoutes.post("/addTeam", authMiddleware, addSideTeam)
teamRoutes.post("/joinSide", authMiddleware, joinSideTeam)
teamRoutes.post("/request", authMiddleware, requestToJoinTeam)
teamRoutes.get("/getRequest", authMiddleware, getJoinReq)
teamRoutes.post("/validate", authMiddleware, handleJoinRequest)
 

 
 
teamRoutes.get('/getAllDetails', authMiddleware, getDetailsByTeamName)
 

teamRoutes.put("/changeTeam", authMiddleware, changeMainTeam)

teamRoutes.post("/team-info",authMiddleware,getTeamInfo)

 

 
export default teamRoutes