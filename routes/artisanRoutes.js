import express from 'express';

import { 
    getArtisan, 
    getArtisansBySearch, 
    signinArtisan, 
    signupArtisan, 
    updateArtisan 
} from '../controllers/artisanController.js';

import artisanAuth from '../middleware/artisanAuth.js';

const router = express.Router();

router.post('/signup', signupArtisan);
router.post('/signin', signinArtisan);

router.get('/search', getArtisansBySearch);
router.get('/profile/view_profile/:id', getArtisan);
router.patch('/profile/update_profile/:id', artisanAuth, updateArtisan);

export default router;
