import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { getAuthToken } from "./auth.js";

app.use(getAuthToken);

import { userRouter, restauranteRouter, searchRouter } from "./routes";

app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/restaurante", restauranteRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
