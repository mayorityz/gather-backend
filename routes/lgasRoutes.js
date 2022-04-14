import express from 'express';

import { getLgasByState } from '../controllers/lgasController.js';

const router = express.Router();

router.get('/', getLgasByState);

export default router;
