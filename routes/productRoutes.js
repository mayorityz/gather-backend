import express from 'express';

import { 
    commentProduct, 
    createProduct, 
    getProduct, 
    getProductsByArtisan, 
    likeProduct 
} from '../controllers/productController.js';

import artisanAuth from '../middleware/artisanAuth.js';
import customerAuth from '../middleware/customerAuth.js';

const router = express.Router();

router.post('/create', artisanAuth, createProduct);
router.get('/view_product/:artisan', getProductsByArtisan);
router.get('/:id', getProduct);
router.patch('/:id/like_product', customerAuth, likeProduct);
router.post('/:id/comment_product', customerAuth, commentProduct);

export default router;
