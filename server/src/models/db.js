import { Pool } from 'pg';

const pool = new Pool ({
    user: "postgres",
    host: process.env.DB_HOST,
    database: "food_order",
    password: "admin",
    port: 5432
});

export default pool;
