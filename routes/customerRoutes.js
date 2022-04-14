import express from 'express';

import { signinCustomer, signupCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/signup', signupCustomer);
router.post('/signin', signinCustomer);

export default router;
