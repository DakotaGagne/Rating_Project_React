/*

This file is responsible for deleting a user and all posts associated with that user.
It receives a DELETE request with the user's data in the headers
It then deletes all posts associated with the user and then deletes the user itself.
If there is an error during the process, it returns a 500 status code with a message saying that there was an internal server error.
    It also rolls back the transaction if an error occurs, ensuring that the database remains consistent.
*/

// IMPORTS
import pkg from 'pg';
import dotenv from 'dotenv';

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



export default async function delete_user(req, res) {
    // userData from headers
    const userData = JSON.parse(req.headers.authorization);
    // Need to delete all posts tied to userData.id first
    // Then delete the user itself
    // If post deletion fails, user deletion should not occur
    try {
        // Begin transaction
        await pg.query('BEGIN');
        // Delete all posts associated with the user
        await pg.query('DELETE FROM posts WHERE user_id = $1 RETURNING *', [userData.id]);
        // Delete the user itself
        const userRes = await pg.query('DELETE FROM users WHERE id = $1 AND username = $2 RETURNING *', [userData.id, userData.username]);
        // Commit transaction
        await pg.query('COMMIT');

        // Send success response
        if (userRes.rowCount === 0) {
            throw new Error('User not found');
        }
        res.status(200).json({ success: true, message: 'User and associated posts deleted successfully' });
    } catch (error) {
        // Rollback transaction in case of error
        await pg.query('ROLLBACK');

        // Send error response
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}