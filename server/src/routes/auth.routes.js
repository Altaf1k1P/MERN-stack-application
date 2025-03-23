import { Router } from 'express';
import { register, login } from '../controllers/auth.collection.js';

// Define routes
const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;