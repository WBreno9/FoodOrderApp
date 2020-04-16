import pool from "./db";
import precoModel from "./preco";

async function createAdicional(adicional) {
  const client = await pool.connect();

  try {
    const { idpreco } = await precoModel.createPreco(adicional.preco);

    const res = await client.query(
      `INSERT INTO "food_order"."adicional"
       VALUES(DEFAULT, $1, $2, $3, $4)
       RETURNING *;`,
      [adicional.nome, adicional.descricao, idpreco, adicional.idprato]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getAdicional(idadicional) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."adicional"
       WHERE "adicional"."idadicional" = $1;`,
      [idadicional]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

export default {
  createAdicional,
  getAdicional,
};
