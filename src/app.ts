import express from 'express';
import cors from 'cors';
import questionsRouter from './routers/questionsRouter';
import middlewareError from './middlewares/middlewareError';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use(middlewareError);

export default app;
