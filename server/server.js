import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pkg from 'pg';
import TMDB_API_SEARCH from './utils/TMDB_API_SEARCH.js';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

// CONSTANTS
;
// Directory name
const __dirname = dirname(fileURLToPath(import.meta.url));
// Express
const app = express();
const port = 3000;
// Bcrypt
const saltRounds = 10;

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

// Express configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Middleware

app.use(morgan('tiny'));
app.use(bodyParser.json({ strict: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true})
);
app.use(passport.initialize());
app.use(passport.session());


// Get Routes
app.get('/api/posts', (req, res) => {
  pg.query('SELECT * FROM public.posts ORDER BY id DESC', (err, result) => {
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

app.get('/user/authenticated', (req, res) => {
  const authenticated = req.user!==undefined;
  if(!authenticated){
    console.log("User not authenticated", req.user);
  }
  res.status(200).json({ authenticated: authenticated });
});


// Post Routes
app.post('/api/create_post', (req, res) => {
  try {
    let data = req.body;
    console.log("data", req.body);
    pg.query('INSERT INTO public.posts (media_title, media_type, media_rating, post_title, post_author, post_content, user_id, api_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
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


app.post('/user/login', passport.authenticate('local'), (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).send('User logged in');
    console.log("User logged in", req.user);
  } else {
    res.status(401).send('User not logged in');
    console.log("User not logged in", req.user);
  }
});


app.post('/user/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkResult = await pg.query('SELECT * FROM users WHERE username = $1', [username]);

    if(checkResult.rows.length > 0){
      res.status(400).send("User already exists");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if(err){
          console.error("Error hashing password: ", err);
          res.status(500).send("Internal server error");
        } else {
          const pgRes = await pg.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
          const user = pgRes.rows[0];
          req.login(user, (err) => {
            console.log("User created");
            res.status(201).send("User created");
          });
        }
      });
    }
  } catch(err) {
    console.error("Error when querying database: ", err);
    res.status(500).send("Internal server error");
  }
});

passport.use(new Strategy(async function verify(username, password, cb) {
  try {
    const result = await pg.query('SELECT * FROM public.users WHERE username = $1', [username]);
    if(result.rows.length > 0){
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        console.log("Result: ", result);
        console.log("Error: ", err);
        if(err){
          console.error("Error comparing passwords: ", err);
          return cb(err);
        } else {
          if(result){
            console.log("User found");
            return cb(null, user);
          } else {
            return cb(null, false);
          };
        };
      });
    } else {
      return cb("User not found");
    };
  } catch(err) {
    console.error("Error when querying database: ", err);
    return cb(err);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});