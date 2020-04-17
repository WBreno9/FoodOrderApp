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

async function getPrato(idprato) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."prato"
       WHERE "prato"."idprato" = $1;`,
      [idprato]
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

async function updatePrato(pratoUpdate) {
  const client = await pool.connect();

  try {
    const { idpreco } = await precoModel.createPreco(pratoUpdate.preco);

    const res = await client.query(
      `UPDATE "food_order"."prato"
       SET "disponivel" = $2, "preco_idpreco" = $3
       WHERE "idprato" = $1
       RETURNING *;`,
      [pratoUpdate.idprato, pratoUpdate.disponivel, idpreco]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

export default {
  createPrato,
  getPrato,
  getPratoByNomeRestaurante,
  getPratosByRestaurante,
  updatePrato,
};
