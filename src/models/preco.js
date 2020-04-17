import pool from "./db";

async function createPreco(valor) {

  const client = await pool.connect();

  try {
    const res = await client.query(
      `INSERT INTO "food_order"."preco"
       VALUES(DEFAULT, $1, DEFAULT)
       RETURNING *;`,
      [valor]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPreco(idpreco) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."preco"
       WHERE "preco.idpreco" = $1;`,
      [idpreco]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

export default {
  createPreco,
  getPreco,
};
