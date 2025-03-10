// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        const { default: app } = await import('./app');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
