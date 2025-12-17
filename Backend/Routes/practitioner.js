import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getPractitioners,
    getPractitioner,
    createPractitioner,
    updatePractitioner,
    deletePractitioner
} from '../controllers/practitionerController.js';

const router = express.Router();

// Practitioner routes
router.get('/', getPractitioners);
router.get('/:id', getPractitioner);
router.post('/', protect, createPractitioner);
router.put('/:id', protect, updatePractitioner);
router.delete('/:id', protect, deletePractitioner);

export default router;
