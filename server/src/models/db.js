import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: "food_order", // process.env.DB,
  password: "admin", // process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
