import express from "express";
import restauranteModel from "../models/restaurante";
import pratoModel from "../models/prato";

let searchRouter = express.Router();

searchRouter.get("/restaurante", async (req, res) => {
  if (!req.query) {
    return res.status(400).end();
  }

  let nome = req.query.nome;

  if (!nome) {
    res.status(400).end();
  } else {
    nome = nome.toLowerCase();

    let restaurants = await restauranteModel.getRestaurantes();
    restaurants = restaurants.map((obj) => {
      obj.password = undefined;
      return obj;
    });

    if (nome == "all") {
      res.send(restaurants);
    } else {
      res.send(
        restaurants.filter((obj) => obj.nome.toLowerCase().includes(nome))
      );
    }
  }
});

searchRouter.get("/prato", async (req, res) => {
  if (!req.query) {
    return res.status(400).end();
  }

  const idrestaurante = req.query.idrestaurante;

  if (!idrestaurante) {
    res.status(400).end();
  } else {
    let pratos = await pratoModel.getPratosByRestaurante(idrestaurante);
    
    let nome = req.query.nome;
    if (nome) {
      nome = nome.toLowerCase();
      pratos = pratos.filter((obj) => obj.nome.toLowerCase().includes(nome));
    }

    res.send(pratos);
  }
});

export default searchRouter;
