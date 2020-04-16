import pool from './db';
import precoModel from './preco.js';

async function createPrato(prato) {
  const client = await pool.connect();

  try {
    const {
      idpreco
    } = precoModel.createPreco(prato.preco);

    const res = await client.query(
      `INSERT INTO "food_order"."prato"
       VALUES(DEFAULT, $1)`,
      [prato.nome, prato.descricao, prato.idrestaurante, idpreco]
    );

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPratoByNomeRestaurante(nome, idrestaurante) {
  const client = await pool.connect();

  try {
    const res = await client.query(``, [nome, idrestaurante]);

    return res.rows[0];
  } finally {
    client.release();
  }
}

async function getPratosByRestaurante() {}

export default {
  createPrato,
  getPratoByNomeRestaurante,
  getPratosByRestaurante,
};
