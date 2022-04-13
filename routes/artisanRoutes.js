import express from 'express';

import { signinArtisan, signupArtisan } from '../controllers/artisanController.js';

const router = express.Router();

router.post('/signup', signupArtisan);
router.post('/signin', signinArtisan);

export default router;
