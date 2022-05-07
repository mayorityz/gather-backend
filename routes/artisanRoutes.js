import express from 'express';

import { 
    customerReview,
    getArtisan, 
    getArtisansBySearch, 
    getCustomerReviewsByArtisan, 
    rateArtisan, 
    signinArtisan, 
    signupArtisan, 
    updateArtisan, 
    updateCurrentRating
} from '../controllers/artisanController.js';

import artisanAuth from '../middleware/artisanAuth.js';
import customerAuth from '../middleware/customerAuth.js';

const router = express.Router();

router.post('/signup', signupArtisan);
router.post('/signin', signinArtisan);

router.get('/search', getArtisansBySearch);
router.get('/profile/view_profile/:id', getArtisan);
router.patch('/profile/update_profile/:id', artisanAuth, updateArtisan);

router.post('/:id/customer_review', customerAuth, customerReview)
router.get('/:id/customer_reviews', getCustomerReviewsByArtisan);
router.post('/:id/rate_artisan', customerAuth, rateArtisan);
router.patch('/:id/current_rating', updateCurrentRating);

export default router;
