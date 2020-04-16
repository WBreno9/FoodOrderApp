import express from "express";
import { genAuthToken, requireAuth } from "../auth";
import restauranteModel from "../models/restaurante";
import pratoModel from "../models/prato";

let restauranteRouter = express.Router();

restauranteRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let rs = await restauranteModel.getRestauranteByEmail(email);

  if (rs != undefined && rs.password === password) {
    rs.role = "restaurante";
    res.send(genAuthToken(rs));
  } else {
    res.status(401).end();
  }
});

restauranteRouter.post("/", async (req, res) => {
  const rs = await restauranteModel.createRestaurante(req.body);

  res.send(rs);
});

restauranteRouter.get("/me", requireAuth("restaurante"), async (req, res) => {
  res.send(req.decoded_token);
});

restauranteRouter.post(
  "/prato",
  requireAuth("restaurante"),
  async (req, res) => {
    const prato = req.body;
    const idrestaurante = req.decoded_token.idrestaurante;

    res.send(await pratoModel.createPrato(prato, idrestaurante));
  }
);

export default restauranteRouter;
