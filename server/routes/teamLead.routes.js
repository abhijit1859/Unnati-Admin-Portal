import express from 'express'
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { teamInfo, teamLeaderInfo } from '../controllers/teamLeader.controllers.js';

const leadRoutes = express.Router();

leadRoutes.get('/lead-info', authMiddleware, teamLeaderInfo)
leadRoutes.get('/team-info', authMiddleware, teamInfo)

export default leadRoutes;