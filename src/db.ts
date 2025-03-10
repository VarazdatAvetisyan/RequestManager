import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Request } from './entities/request.entity';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [Request],
        synchronize: true, // Use with caution in production
    });
    console.log('Database connected');
};