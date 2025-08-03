import express from 'express';
import {
    createCv,
    getMyCvs,
    getCvById,
    updateCv,
    deleteCv,
} from '../controllers/cvController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes protected by authentication
router.route('/').post(protect, createCv).get(protect, getMyCvs);
router.route('/:id').get(protect, getCvById).put(protect, updateCv).delete(protect, deleteCv);

export default router;