import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import path from 'path'; // For serving frontend static files
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/cv', cvRoutes);


    app.get('/', (req, res) => {
        res.send('API is running in development mode...');
    });

    // --------------------------------------------------

    

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});