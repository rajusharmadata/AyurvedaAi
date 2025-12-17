import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getRemedyForMessage
} from '../controllers/chatController.js';

const router = express.Router();

// Chat routes
router.post('/', getRemedyForMessage);


export default router;
