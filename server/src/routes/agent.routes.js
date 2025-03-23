import { Router } from 'express';
import { addAgent, findAgent } from '../controllers/agent.controller.js';

// Define routes
const router = Router();

router.post('/add-agent', addAgent);
router.get('/find', findAgent);

export default router;