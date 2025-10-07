import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { monthlyLeaderBoard } from '../controllers/leaderBoard.controllers.js';

const leaderBoardRoutes = express.Router();


leaderBoardRoutes.get("/monthly",monthlyLeaderBoard)

export default leaderBoardRoutes