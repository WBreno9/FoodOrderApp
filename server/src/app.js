import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import models from './models';

app.get('/', async (req, res) => {
    await models.userModel.createUser({
        nome: "jeffa",
        email: "jeff123@bongo.com",
        password: "j3ffi"
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
})
