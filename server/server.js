/*

Main server file. Contains all the routes and configurations for the server.
Everything is imported from other files to keep this file clean and easy to read.

*/

// IMPORTS
// NPM Imports
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pkg from 'pg';
import dotenv from 'dotenv';

import cookieSession from 'cookie-session';
import cors from 'cors';
import passport from 'passport';

import passportStrategies from './middlewares/passportStrategies.js';
import { fail } from 'assert';

import bcrypt from 'bcrypt';
import { create } from 'domain';

// API Custom GETS and POSTS
import { create_post, update_post, delete_post, fetch_post_data } from './routes/api/post_db_manipulation.js';
import search from './routes/api/search.js';
import authRouter from './routes/auth.js';

// ! Maybe move db stuff to its own file and link it here and passport-stragegies.js instead of passing it as function

// CONSTANTS
// Directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express
const app = express();
const port = 3000;

// Dotenv configuration
dotenv.config();

// Postgres configuration
const { Client } = pkg
const pg = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pg.connect();

// Middleware
app.use(morgan('tiny')); // ! Change to 'combined' for production (logs to file)
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession(
    {
      name:'session',
      keys: [process.env.SESSION_SECRET],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  )
)
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
    credentials: true
  }
))

app.use('/auth', authRouter);

// Passport setup (middleware)
passportStrategies(pg, bcrypt);

// GET ROUTES
app.get('/api/posts', (req, res) => fetch_post_data(req, res, pg));
app.get('/api/posts/user', (req, res) => fetch_post_data(req, res, pg, true));
app.get('/api/posts/id', (req, res) => fetch_post_data(req, res, pg, true, true));
app.get('/api/search', search);

// POST ROUTES
app.post('/api/create_post', (req, res) => create_post(req, res, pg));
// PUT ROUTES
app.put('/api/update_post', (req, res) => update_post(req, res, pg));
// DELETE ROUTES
app.delete('/api/delete_post', (req, res) => delete_post(req, res, pg));


// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});