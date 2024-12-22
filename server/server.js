
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import pkg from 'pg';
const { Client } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));

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

app.get('/api', (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


/*

INSERT INTO posts
VALUES
("Deadpool", "Movie", 5.0, "Deadpool Review", "John Doe", "Deadpool is a hilarious and action-packed movie with a unique sense of humor. Ryan Reynolds delivers an unforgettable performance as the titular character.", 1),
("Inception", "Movie", 4.0, "Inception Review", "John Doe", "Inception is a mind-bending thriller that keeps you on the edge of your seat. Christopher Nolan's direction and the complex plot make it a must-watch.", 1),
("The Matrix", "Movie", 5.0, "The Matrix Review", "John Doe", "The Matrix is a groundbreaking sci-fi film that revolutionized the genre. Its innovative special effects and thought-provoking storyline are exceptional.", 1),
("Breaking Bad", "TV Show", 5.0, "Breaking Bad Review", "John Doe", "Breaking Bad is an intense and gripping series that chronicles the transformation of Walter White. The storytelling and character development are top-notch.", 1),
("Game of Thrones", "TV Show", 4.0, "Game of Thrones Review", "John Doe", "Game of Thrones is an epic and captivating series with complex characters and intricate plots. Despite its controversial ending, it remains a landmark in television.", 1),
("The Witcher", "TV Show", 4.0, "The Witcher Review", "John Doe", "The Witcher is an exciting fantasy series with a rich lore and compelling characters. Henry Cavill's portrayal of Geralt of Rivia is particularly noteworthy.", 1),
("Stranger Things", "TV Show", 5.0, "Stranger Things Review", "John Doe", "Stranger Things is a nostalgic and thrilling series that masterfully blends horror and adventure. Its 80s references and strong performances make it a standout.", 1),
("The Office", "TV Show", 5.0, "The Office Review", "John Doe", "The Office is a hilarious and heartwarming sitcom that offers a unique look at office life. Its memorable characters and witty humor make it a timeless classic.", 1),
("Friends", "TV Show", 4.0, "Friends Review", "John Doe", "Friends is a funny and relatable sitcom that captures the essence of friendship and life in New York City. Its iconic moments and chemistry among the cast are unforgettable.", 1),
("The Dark Knight", "Movie", 5.0, "The Dark Knight Review", "John Doe", "The Dark Knight is a brilliant and dark superhero film that redefined the genre. Heath Ledger's performance as the Joker is legendary and the film's narrative is compelling.", 1),
("Interstellar", "Movie", 5.0, "Interstellar Review", "John Doe", "Interstellar is a visually stunning and thought-provoking sci-fi film. Its exploration of space and time, combined with Hans Zimmer's score, creates an unforgettable experience.", 1),
("The Mandalorian", "TV Show", 5.0, "The Mandalorian Review", "John Doe", "The Mandalorian is a fantastic addition to the Star Wars universe, offering a fresh perspective and new characters. Its production quality and storytelling are top-tier.", 1),
("The Boys", "TV Show", 4.0, "The Boys Review", "John Doe", "The Boys is a dark and satirical series that provides a unique take on superheroes. Its gritty narrative and complex characters make it a compelling watch.", 1),
("Avatar", "Movie", 4.0, "Avatar Review", "John Doe", "Avatar is a visually spectacular film that immerses viewers in the world of Pandora. Its groundbreaking special effects and environmental message are noteworthy.", 1),
("Avengers: Endgame", "Movie", 5.0, "Avengers: Endgame Review", "John Doe", "Avengers: Endgame is an epic and satisfying conclusion to the Marvel saga. Its emotional depth and action-packed sequences make it a fitting end to the series.", 1),
("The Crown", "TV Show", 4.0, "The Crown Review", "John Doe", "The Crown is a well-acted and beautifully produced series that offers an intimate look at the British monarchy. Its historical accuracy and performances are commendable.", 1),
("Sherlock", "TV Show", 5.0, "Sherlock Review", "John Doe", "Sherlock is a brilliant and captivating modern adaptation of the classic detective stories. Benedict Cumberbatch's portrayal of Sherlock Holmes is exceptional.", 1),
("Black Mirror", "TV Show", 4.0, "Black Mirror Review", "John Doe", "Black Mirror is a dark and thought-provoking anthology series that explores the impact of technology on society. Each episode presents a unique and often unsettling narrative.", 1),
("The Godfather", "Movie", 5.0, "The Godfather Review", "John Doe", "The Godfather is a cinematic masterpiece that delves into the world of organized crime. Its storytelling, direction, and performances are unparalleled.", 1),
("Pulp Fiction", "Movie", 5.0, "Pulp Fiction Review", "John Doe", "Pulp Fiction is a stylish and influential film that showcases Quentin Tarantino's unique storytelling. Its nonlinear narrative and memorable dialogue are iconic.", 1)
*/



const examplePosts = [
  {
    media_title: "Deadpool",
    media_type: "Movie",
    title: "Post One",
    author: "John Doe",
    rating: 5,
    content: "This is post one"
  }, 
  {
    media_title: "Inception",
    media_type: "Movie",
    title: "Post Two",
    author: "Jane Doe",
    rating: 4,
    content: "This is post two"
    },
    {
    media_title: "The Matrix",
    media_type: "Movie",
    title: "Post Three",
    author: "Alice Smith",
    rating: 5,
    content: "This is post three"
    },
    {
    media_title: "Breaking Bad",
    media_type: "TV Show",
    title: "Post Four",
    author: "Bob Johnson",
    rating: 5,
    content: "This is post four"
    },
    {
    media_title: "Game of Thrones",
    media_type: "TV Show",
    title: "Post Five",
    author: "Charlie Brown",
    rating: 4,
    content: "This is post five"
    },
    {
    media_title: "The Witcher",
    media_type: "TV Show",
    title: "Post Six",
    author: "David Wilson",
    rating: 4,
    content: "This is post six"
    },
    {
    media_title: "Stranger Things",
    media_type: "TV Show",
    title: "Post Seven",
    author: "Eve Davis",
    rating: 5,
    content: "This is post seven"
    },
    {
    media_title: "The Office",
    media_type: "TV Show",
    title: "Post Eight",
    author: "Frank Miller",
    rating: 5,
    content: "This is post eight"
    },
    {
    media_title: "Friends",
    media_type: "TV Show",
    title: "Post Nine",
    author: "Grace Lee",
    rating: 4,
    content: "This is post nine"
    },
    {
    media_title: "The Dark Knight",
    media_type: "Movie",
    title: "Post Ten",
    author: "Henry Clark",
    rating: 5,
    content: "This is post ten"
    },
    {
    media_title: "Interstellar",
    media_type: "Movie",
    title: "Post Eleven",
    author: "Ivy Lewis",
    rating: 5,
    content: "This is post eleven"
    },
    {
    media_title: "The Mandalorian",
    media_type: "TV Show",
    title: "Post Twelve",
    author: "Jack Walker",
    rating: 5,
    content: "This is post twelve"
    },
    {
    media_title: "The Boys",
    media_type: "TV Show",
    title: "Post Thirteen",
    author: "Karen Hall",
    rating: 4,
    content: "This is post thirteen"
    },
    {
    media_title: "Avatar",
    media_type: "Movie",
    title: "Post Fourteen",
    author: "Larry Young",
    rating: 4,
    content: "This is post fourteen"
    },
    {
    media_title: "Avengers: Endgame",
    media_type: "Movie",
    title: "Post Fifteen",
    author: "Megan King",
    rating: 5,
    content: "This is post fifteen"
    },
    {
    media_title: "The Crown",
    media_type: "TV Show",
    title: "Post Sixteen",
    author: "Nancy Scott",
    rating: 4,
    content: "This is post sixteen"
    },
    {
    media_title: "Sherlock",
    media_type: "TV Show",
    title: "Post Seventeen",
    author: "Oscar Green",
    rating: 5,
    content: "This is post seventeen"
    },
    {
    media_title: "Black Mirror",
    media_type: "TV Show",
    title: "Post Eighteen",
    author: "Paul Adams",
    rating: 4,
    content: "This is post eighteen"
    },
    {
    media_title: "The Godfather",
    media_type: "Movie",
    title: "Post Nineteen",
    author: "Quincy Baker",
    rating: 5,
    content: "This is post nineteen"
    },
    {
    media_title: "Pulp Fiction",
    media_type: "Movie",
    title: "Post Twenty",
    author: "Rachel Carter",
    rating: 5,
    content: "This is post twenty"
    }
]