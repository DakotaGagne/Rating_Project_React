/*

This file is responsible for handling the registration of a new user.
It receives a POST request with the username and password in the body of the request. 
It then checks if the username already exists in the database. 
If it does, it returns a 400 status code with a message saying that the user already exists. 
If the username does not exist, it hashes the password using bcrypt and inserts the new user into the database. 
It then logs in the new user and returns a 201 status code with a message saying that the user was created. 
If there is an error during the process, it returns a 500 status code with a message saying that there was an internal server error.

*/

// IMPORTS
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// CONFIG
// dotenv config
dotenv.config();
// postgres config
const { Client } = pkg
const pg = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
pg.connect();

// CONSTANTS
const SALT_ROUNDS = 10; // Number of rounds for bcrypt to hash the password


export default async function register(req, res) {
    // Extract username and password from request body
    const { username, password } = req.body;
    try {
        const checkResult = await pg.query('SELECT * FROM users WHERE username = $1', [username]);

        if(checkResult.rows.length > 0){
            // User already exists
            res.status(400).send("User already exists");
        } else {
            // User does not exist, hash password and insert into database
            bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
                if(err){
                    // Error hashing password
                    console.log("Error hashing password: ", err);
                    res.status(500).json({success:false, message:"Internal server error"});
                } else {
                    // Insert user into database
                    const pgRes = await pg.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
                    const user = pgRes.rows[0];
                    req.login(user, (err) => {
                        // Log in user
                        console.log("User created");
                        res.status(201).json({success: true, message: "User created"});
                    });
                }
            });
        }
    } catch(err) {
        // Error querying database
        console.error("Error when querying database: ", err);
        res.status(500).send("Internal server error");
    }
}