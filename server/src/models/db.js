import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB);
console.log(process.env.DB_PASSWORD);

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
