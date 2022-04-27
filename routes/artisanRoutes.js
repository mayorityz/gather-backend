import express from 'express';

import { getArtisansBySearch, signinArtisan, signupArtisan } from '../controllers/artisanController.js';

const router = express.Router();

router.post('/signup', signupArtisan);
router.post('/signin', signinArtisan);
router.get('/search', getArtisansBySearch);

export default router;
