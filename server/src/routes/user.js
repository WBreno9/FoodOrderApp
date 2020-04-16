import express from "express";
import { genAuthToken, requireAuth } from "../auth.js";
import userModel from "../models/user.js";

let userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const rs = await userModel.getUserByEmail(email);

  if (rs != undefined && rs.password === password) {
    res.send(genAuthToken(rs));
  } else {
    res.status(401).end();
  }
});

userRouter.post("/", async (req, res) => {
  const rs = await userModel.createUser(req.body);

  res.send(rs);
});

userRouter.get("/me", requireAuth, async (req, res) => {
  res.send(req.decoded_token);
});

export default userRouter;
