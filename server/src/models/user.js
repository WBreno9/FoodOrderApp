import pool from './db.js';

async function createUser(userData) {
    const client = await pool.connect();

    try {
        const res = await client
            .query(`INSERT INTO \"food_order\".\"usuario\" 
                    VALUES(DEFAULT, $1, $2, $3)
                    RETURNING *;`,
                [userData.nome, userData.email, userData.password]); 

        console.log(res.rows[0]);
    } finally {
        client.release();
    }
}

export default {
    createUser
};

