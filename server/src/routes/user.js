import express from 'express';

import pool from './db.js';

let userRouter = express.Router();

userRouter.get("/", async (_, res) => {
    console.log("acessing user login");
});

userRouter.post("/", async (_, res) => {
    console.log("acessing user signup");
});

export default userRouter;
