import express from 'express';
import routes from './routes/v1';
import authRoutes from './routes/v1/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', authMiddleware, routes);
app.use(errorHandler);



export default app;