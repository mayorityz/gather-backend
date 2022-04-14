import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

// Routes
// artisan and customer routes
import artisanRoutes from './routes/artisanRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

// states and lgas routes
import statesRoutes from './routes/statesRoutes.js';
import lgasRoutes from './routes/lgasRoutes.js';

const app = express();
dotenv.config({ path: "./config.env" });

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Middlewares
// artisan and customer
app.use('/artisan', artisanRoutes);
app.use('/customer', customerRoutes);

// artisan and customer
app.use('/states', statesRoutes);
app.use('/lgas', lgasRoutes);

// connect to mongodb
connectDB();

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
