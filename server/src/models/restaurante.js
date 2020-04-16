import pool from "./db.js";

async function createRestaurante(restauranteData) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `INSERT INTO "food_order"."restaurante"
      VALUES(DEFAULT, $1, $2, $3, FALSE, 0)
      RETURNING *;`,
      [restauranteData.email, restauranteData.nome, restauranteData.password]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getRestauranteByEmail(email) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."restaurante"
       WHERE "restaurante"."email" = $1`,
      [email]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

export default {
  createRestaurante,
  getRestauranteByEmail,
};
