import express from 'express';

import { getAllSubscribers, subscribe, unsubscribe } from '../controllers/subscriberController.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.delete('/unsubscribe/:email', unsubscribe);
router.get('/', getAllSubscribers);

export default router;
