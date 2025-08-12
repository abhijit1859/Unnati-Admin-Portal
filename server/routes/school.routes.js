import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js'
import { addCenter, assignSchoolToaUser, deleteSchool, displayCenter } from '../controllers/school.controllers.js'

const centerRoutes = express.Router()

centerRoutes.post("/add-center", authMiddleware, addCenter)
centerRoutes.get("/display-center", authMiddleware, displayCenter)
centerRoutes.post("/delete-center",authMiddleware,deleteSchool)
centerRoutes.post("/assign-center",authMiddleware,assignSchoolToaUser)

export default centerRoutes