import express from "express";

import { Client } from 'pg';

let root = express.Router();

root.get("/", async (_, res) => {
  const client = new Client({
    user: "postgres",
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: 5432
  });

  await client.connect();
  const rs = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);

  res.send(rs.rows[0].message); // Hello world!
  await client.end();
});

export { root };
