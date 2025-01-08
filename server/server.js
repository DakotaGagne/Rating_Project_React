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
import authRouter from './routes/auth.js';
import { fail } from 'assert';

import bcrypt from 'bcrypt';
import { create } from 'domain';

// API GETS and POSTS
import { create_post, update_post, delete_post } from './routes/api/post_db_manipulation.js';
import posts from './routes/api/posts.js';
import search from './routes/api/search.js';
// USER GETS and POSTS

// ! Maybe move db stuff to its own file and link it here and passport-stragegies.js instead of passing it as function

// CONSTANTS
// Directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
//CLIENT URL
const CLIENT_URL = "http://localhost:5173";

// Express
const app = express();
const port = 3000;
// Bcrypt
const SALT_ROUNDS = 10;

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
app.use(morgan('tiny'));
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
    origin: CLIENT_URL,
    methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
    credentials: true
  }
))

app.use('/auth', authRouter);

// Get Routes
app.get('/api/posts', (req, res) => posts(req, res, pg));
app.get('/api/posts/user', (req, res) => posts(req, res, pg, true));
app.get('/api/posts/id', (req, res) => posts(req, res, pg, true, true));
app.get('/api/search', search);

// Post Routes
app.post('/api/create_post', (req, res) => create_post(req, res, pg));
app.put('/api/update_post', (req, res) => update_post(req, res, pg));
app.delete('/api/delete_post', (req, res) => delete_post(req, res, pg));

// Passport setup
passportStrategies(pg, bcrypt);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});