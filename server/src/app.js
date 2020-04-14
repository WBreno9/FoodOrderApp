import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { getAuthToken } from './auth.js';

app.use(getAuthToken);

import { userRouter } from './routes';

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
})
