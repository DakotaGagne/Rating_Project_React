import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pkg from 'pg';
import TMDB_API_SEARCH from './utils/TMDB_API_SEARCH.js';
import dotenv from 'dotenv';

const { Client } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect();

// Add headers before the routes are defined
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(morgan('tiny'));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: true }));

app.get('/api/posts', (req, res) => {
  client.query('SELECT * FROM public.posts ORDER BY id DESC', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      res.json({ posts: result.rows });
    }
  });
});

app.get('/api/search', (req, res) => {
  let media_name = req.query.media_name;
  let media_type = req.query.media_type||"";
  let english_only = req.query.english_only || true;

  TMDB_API_SEARCH(media_name, media_type, process.env.TMDB_API_KEY, english_only)
    .then(data => {
      res.status(data.status).send(data.err||data.result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
  });
});

app.post('/api/create_post', (req, res) => {
  try {
    let data = req.body;
    console.log("data", req.body);
    client.query('INSERT INTO public.posts (media_title, media_type, media_rating, post_title, post_author, post_content, user_id, api_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      [data.media_title, data.media_type, data.media_rating, data.post_title, data.post_author, data.post_content, data.user_id, data.api_data], (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal server error');
        } else {
          res.status(201).send('Post created');
        }
    });
  } catch (err) {
    console.error('Invalid JSON:', err);
    res.status(400).send('Invalid JSON');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});