import dotenv from 'dotenv';

dotenv.config();

interface Config{
    PORT: number;
    NODE_ENV: string;
    //DB_URL: string;
    JWT_SECRET?: string;
    //JWT_EXPIRES_IN: string;
    //CLIENT_URL: string;
    //REDIS_URL: string;
    //REDIS_PORT: number;
}

const config: Config = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
}

export default config;