import pool from "./db";

async function createPedido(pedido, idusuario) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `INSERT INTO "food_order"."pedido"
       VALUES(DEFAULT, $1, $2, $3, $4, $5)
       RETURNING *;`,
      [
        pedido.quantidade,
        pedido.endereco,
        pedido.idadicional,
        pedido.idprato,
        idusuario,
      ]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPedidoByUsuario(idusuario) {
  const client = await pool.connect();

  try {
    const res = await client.query(
      `SELECT * FROM "food_order"."pedido"
       WHERE "pedido"."usuario_idusuario" = $1;`,
      [idusuario]);

    return res.rows;
  } finally {
    client.release();
  }
}

export default {
  createPedido,
  getPedidoByUsuario,
};
