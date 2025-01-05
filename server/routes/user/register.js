import pkg from 'pg';
const { Client } = pkg

import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10

const pg = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

pg.connect();


export default async function register(req, res) {
    const { username, password } = req.body;
    try {
        const checkResult = await pg.query('SELECT * FROM users WHERE username = $1', [username]);

        if(checkResult.rows.length > 0){
            res.status(400).send("User already exists");
        } else {
            bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
                if(err){
                    console.log("Error hashing password: ", err);
                    res.status(500).json({success:false, message:"Internal server error"});
                } else {
                    const pgRes = await pg.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
                    const user = pgRes.rows[0];
                    req.login(user, (err) => {
                        console.log("User created");
                        res.status(201).json({success: true, message: "User created"});
                    });
                }
            });
        }
    } catch(err) {
        console.error("Error when querying database: ", err);
        res.status(500).send("Internal server error");
    }
}