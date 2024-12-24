


import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pkg from 'pg';
import TMDB_API_SEARCH from './utils/TMDB_API_SEARCH.js';



const { Client } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));

const media_request = {
  url: 'https://api.themoviedb.org/3/search/multi',
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTZlNDc5ZDg1ZTIzYjEyZGI3NDQxZjIyZTYzZjQ0ZSIsIm5iZiI6MTczNDk4MDg2MC44LCJzdWIiOiI2NzY5YjRmYzVkNmUzNjdjMmI1ZDAyNmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ykp2aOZAZH3BRxNYmhOY7T9de3t-QThF4hisc8SVn3U'
    }
  }
}

const app = express();
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ratings',
  password: '123abc456!@#',
  port: 5432,
});

client.connect();

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/posts', (req, res) => {
  client.query('SELECT * FROM posts', (err, result) => {
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
  let english_only = req.query.english_only || true;
  let url = {
    movie: `https://api.themoviedb.org/3/search/movie?query=${media_name}`,
    tv: `https://api.themoviedb.org/3/search/tv?query=${media_name}`
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //! Hide the API key in a .env file
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTZlNDc5ZDg1ZTIzYjEyZGI3NDQxZjIyZTYzZjQ0ZSIsIm5iZiI6MTczNDk4MDg2MC44LCJzdWIiOiI2NzY5YjRmYzVkNmUzNjdjMmI1ZDAyNmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ykp2aOZAZH3BRxNYmhOY7T9de3t-QThF4hisc8SVn3U'
    }
  };
  TMDB_API_SEARCH(media_name, url, options, english_only)
    .then(data => {
      if (data.status === 404) {
        res.status(404).send(data.err);
      } else if (data.status === 500) {
        res.status(500).send(data.err);
      } else {
        console.log(JSON.stringify(data.result[0]));
        console.log(JSON.parse('{"title":"Deadpool","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original//3E53WEZJqP6aM84D8CckXx4pIHw.jpg","id":293660,"overview":"The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.","release_date":"2016-02-09","rating":7.6,"vote_count":31103,"original_language":"en"}').title)
        res.status(200).send(JSON.stringify(data.result[0]));
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

