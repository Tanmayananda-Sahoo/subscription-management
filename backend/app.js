import express from 'express';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"10mb"}));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use('/user',authRouter);
app.use("/subscriptions", subscriptionRouter);

export default app;