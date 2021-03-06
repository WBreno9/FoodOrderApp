import express from "express";
import { genAuthToken, requireAuth } from "../auth";
import userModel from "../models/user";
import pedidoModel from "../models/pedido";

let userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const rs = await userModel.getUserByEmail(email);

  if (rs != undefined && rs.password === password) {
    rs.role = 'user';
    res.send(genAuthToken(rs));
  } else {
    res.status(401).end();
  }
});

userRouter.post("/", async (req, res) => {
  const { idusuario, email } = await userModel.createUser(req.body);

  res.send({ idusuario, email });
});

userRouter.get("/me", requireAuth('user'), async (req, res) => {
  let rs = req.decoded_token;
  rs.password = undefined;

  res.send(rs);
});

userRouter.post("/pedido", requireAuth('user'), async (req, res) => {
  const { idusuario } = req.decoded_token;
  res.send(await pedidoModel.createPedido(req.body, idusuario));
});

userRouter.get("/history", requireAuth('user'), async (req, res) => {
  const { idusuario } = req.decoded_token;
  res.send(await pedidoModel.getPedidoByUsuario(idusuario));
});

export default userRouter;
