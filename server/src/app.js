import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { root } from './routes'

let app = express();

app.use(cors());

app.use("/", root);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
})