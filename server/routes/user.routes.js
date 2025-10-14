import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { deleteUser, removeFromMainTeam, sendUserDetails } from '../controllers/user.controllers.js';
 

const userRoutes = express.Router()

userRoutes.post("/send",authMiddleware, sendUserDetails);
userRoutes.post("/remove", authMiddleware, removeFromMainTeam)
userRoutes.delete('/deleteUser/:userId', authMiddleware, deleteUser)





export default userRoutes