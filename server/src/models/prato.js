import pool from "./db";
import precoModel from "./preco.js";

async function createPrato(prato, idrestaurante) {
  const client = await pool.connect();

  try {
    const { idpreco } = await precoModel.createPreco(prato.preco);

    const res = await client.query(
      `INSERT INTO "food_order"."prato"
       VALUES(DEFAULT, $1, $2, FALSE, $3, $4)
       RETURNING *;`,
      [prato.nome, prato.descricao, idrestaurante, idpreco]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPratoByNomeRestaurante(nome, idrestaurante) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."prato"
       WHERE "prato"."nome" = $1
       AND "prato"."idrestaurante" = $2;`,
      [nome, idrestaurante]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPratosByRestaurante(idrestaurante) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."prato"
      WHERE "restaurante_idrestaurante" = $1;`,
      [idrestaurante]
    );

    return res.rows;
  } finally {
    client.release();
  }
}

export default {
  createPrato,
  getPratoByNomeRestaurante,
  getPratosByRestaurante,
};
