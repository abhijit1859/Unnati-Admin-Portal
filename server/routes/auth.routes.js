import express from "express"
import { getUserInfo, login, logout, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
 
const authRoutes = express.Router();


authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.delete("/logout", logout)
authRoutes.get("/me", authMiddleware, getUserInfo)

export default authRoutes