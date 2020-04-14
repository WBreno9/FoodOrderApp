import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import models from './models';

app.use('/', (req, _, next) => {
    req.models = models;
    return next();
});

import { userRouter } from './routes';

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
})
