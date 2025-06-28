import express from 'express';
import { createFeedback, deleteFeedback, getFeedbackById, getFeedbacks, updateFeedback } from '../Controller/feedBackController.js';
import { admin, protect } from '../MiddleWare/authMiddleware.js';
const router = express.Router();

router.post('/create', createFeedback);
router.put('/update/:id',updateFeedback);
router.delete('/delete/:id',deleteFeedback);
router.get('/get',getFeedbacks);
router.get('/:id', getFeedbackById);
export default router;