import express from 'express'
import { deleteEvent, eventDetailsController, getUserEvents } from '../controllers/eventControllers.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/event-details',protect , eventDetailsController)
router.get('/get-all-events',protect, getUserEvents)
router.delete('/delete-event/:eventId', protect, deleteEvent);

export default router;