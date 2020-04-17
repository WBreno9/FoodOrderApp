import express from "express";
import { genAuthToken, requireAuth } from "../auth";
import restauranteModel from "../models/restaurante";
import pratoModel from "../models/prato";
import adicionalModel from "../models/adicional";

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
  const {
    idrestaurante,
    nome,
    email,
  } = await restauranteModel.createRestaurante(req.body);

  res.send({
    idrestaurante,
    nome,
    email,
  });
});

restauranteRouter.get("/me", requireAuth("restaurante"), async (req, res) => {
  let rs = req.decoded_token;
  rs.password = undefined;

  res.send(rs);
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

restauranteRouter.post(
  "/prato/update",
  requireAuth("restaurante"),
  async (req, res) => {
    const pratoUpdate = req.body;

    const { restaurante_idrestaurante } = await pratoModel.getPrato(
      pratoUpdate.idprato
    );

    if (restaurante_idrestaurante !== req.decoded_token.idrestaurante) {
      return res.status(401).end();
    }

    const { disponivel, preco_idpreco } = await pratoModel.updatePrato(
      pratoUpdate
    );

    return res.send({ disponivel, preco_idpreco });
  }
);

restauranteRouter.post(
  "/adicional",
  requireAuth("restaurante"),
  async (req, res) => {
    const adicional = req.body;

    res.send(await adicionalModel.createAdicional(adicional));
  }
);

restauranteRouter.post(
  "/update",
  requireAuth("restaurante"),
  async (req, res) => {
    let restaurante = req.body;
    restaurante.idrestaurante = req.decoded_token.idrestaurante;

    const {
      disponivel,
      categoria_idcategoria,
    } = await restauranteModel.updateRestaurante(restaurante);
    res.send({ disponivel, categoria_idcategoria });
  }
);

export default restauranteRouter;
