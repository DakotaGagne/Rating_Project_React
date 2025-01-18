DROP TABLE IF EXISTS "public"."posts";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS posts_id_seq;

-- Table Definition
CREATE TABLE "public"."posts" (
    "id" int4 NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    "media_title" varchar(200) NOT NULL,
    "media_type" varchar(20) NOT NULL,
    "media_rating" float8 NOT NULL,
    "post_title" varchar(50) NOT NULL,
    "post_author" varchar NOT NULL,
    "post_content" text NOT NULL,
    "user_id" int4,
    "api_data" text,
    "time_created" int8,
    CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX posts_id_key ON public.posts USING btree (id);

INSERT INTO "public"."posts" ("id", "media_title", "media_type", "media_rating", "post_title", "post_author", "post_content", "user_id", "api_data", "time_created") VALUES
(1, 'Deadpool', 'Movie', 5, 'Deadpool Review', 'John Doe', 'Deadpool is a hilarious and action-packed movie with a unique sense of humor. Ryan Reynolds delivers an unforgettable performance as the titular character.', 1, '{"title":"Deadpool","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/3E53WEZJqP6aM84D8CckXx4pIHw.jpg","id":293660,"overview":"The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.","release_date":"2016-02-09","rating":7.6,"vote_count":31103,"original_language":"en"}', 1);
INSERT INTO "public"."posts" ("id", "media_title", "media_type", "media_rating", "post_title", "post_author", "post_content", "user_id", "api_data", "time_created") VALUES
(2, 'Inception', 'Movie', 4, 'Inception Review', 'John Doe', 'Inception is a mind-bending thriller that keeps you on the edge of your seat. Christopher Nolans direction and the complex plot make it a must-watch.', 1, '{"title":"Inception","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg","id":27205,"overview":"Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person''s idea into a target''s subconscious.","release_date":"2010-07-15","rating":8.4,"vote_count":36701,"original_language":"en"}', 2);
INSERT INTO "public"."posts" ("id", "media_title", "media_type", "media_rating", "post_title", "post_author", "post_content", "user_id", "api_data", "time_created") VALUES
(3, 'The Matrix', 'Movie', 5, 'The Matrix Review', 'John Doe', 'The Matrix is a groundbreaking sci-fi film that revolutionized the genre. Its innovative special effects and thought-provoking storyline are exceptional.', 1, '{"title":"The Matrix","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg","id":603,"overview":"Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.","release_date":"1999-03-31","rating":8.2,"vote_count":25751,"original_language":"en"}', 3);
INSERT INTO "public"."posts" ("id", "media_title", "media_type", "media_rating", "post_title", "post_author", "post_content", "user_id", "api_data", "time_created") VALUES
(4, 'Breaking Bad', 'TV Show', 5, 'Breaking Bad Review', 'John Doe', 'Breaking Bad is an intense and gripping series that chronicles the transformation of Walter White. The storytelling and character development are top-notch.', 1, '{
        "title": "Breaking Bad",
        "media_type": "tv",
        "release_date": "2008-01-20",
        "poster_path": "https://image.tmdb.org/t/p/original//ineLOBPG8AZsluYwnkMpHRyu7L.jpg",
        "id": "1396",
        "overview": "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family''s financial future at any cost as he enters the dangerous world of drugs and crime.",
        "rating": "8.9",
        "vote_count": "14675",
        "original_language": "en"
    }', 4),
(5, 'Game of Thrones', 'TV Show', 4, 'Game of Thrones Review', 'John Doe', 'Game of Thrones is an epic and captivating series with complex characters and intricate plots. Despite its controversial ending, it remains a landmark in television.', 1, '{
        "title": "Game of Thrones",
        "media_type": "tv",
        "release_date": "2011-04-17",
        "poster_path": "https://image.tmdb.org/t/p/original//1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        "id": "1399",
        "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night''s Watch, is all that stands between the realms of men and icy horrors beyond.",
        "rating": "8.5",
        "vote_count": "24295",
        "original_language": "en"
    }', 5),
(30, 'Arcane', 'Tv', 5, 'fantastic', '00001', 'watch it. watch it. watch it. watch it. watch it. watch it. watch it. watch it. watch it. watch it.', 5, '{"title":"Arcane","media_type":"tv","release_date":"2021-11-06","poster_path":"https://image.tmdb.org/t/p/original//abf8tHznhSvl9BAElD2cQeRr7do.jpg","id":94605,"overview":"Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.","rating":8.8,"vote_count":4769,"original_language":"en"}', 22),
(6, 'The Witcher', 'TV Show', 4, 'The Witcher Review', 'John Doe', 'The Witcher is an exciting fantasy series with a rich lore and compelling characters. Henry Cavills portrayal of Geralt of Rivia is particularly noteworthy.', 1, '{
        "title": "The Witcher",
        "media_type": "tv",
        "release_date": "2019-12-20",
        "poster_path": "https://image.tmdb.org/t/p/original//cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
        "id": "71912",
        "overview": "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        "rating": "8.1",
        "vote_count": "5892",
        "original_language": "en"
    }', 6),
(7, 'Stranger Things', 'TV Show', 5, 'Stranger Things Review', 'John Doe', 'Stranger Things is a nostalgic and thrilling series that masterfully blends horror and adventure. Its 80s references and strong performances make it a standout.', 1, '{
        "title": "Stranger Things",
        "media_type": "tv",
        "release_date": "2016-07-15",
        "poster_path": "https://image.tmdb.org/t/p/original//uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
        "id": "66732",
        "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        "rating": "8.6",
        "vote_count": "17797",
        "original_language": "en"
    }', 7),
(9, 'Friends', 'TV Show', 4, 'Friends Review', 'John Doe', 'Friends is a funny and relatable sitcom that captures the essence of friendship and life in New York City. Its iconic moments and chemistry among the cast are unforgettable.', 1, '{
        "title": "Friends",
        "media_type": "tv",
        "release_date": "1994-09-22",
        "poster_path": "https://image.tmdb.org/t/p/original//2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
        "id": 1668,
        "overview": "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        "rating": 8.4,
        "vote_count": 8087,
        "original_language": "en"
    }', 8),
(10, 'The Dark Knight', 'Movie', 4, 'The Dark Knight Review', 'John Doe', 'The Dark Knight is a brilliant and dark superhero film that redefined the genre. Heath Ledgers performance as the Joker is legendary and the films narrative is compelling.', 1, '{"title":"The Dark Knight","media_type":"movie","release_date":"2008-07-16","poster_path":"https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg","id":155,"overview":"Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.","rating":8.5,"vote_count":33208,"original_language":"en"}', 9),
(11, 'Interstellar', 'Movie', 5, 'Interstellar Review', 'John Doe', 'Interstellar is a visually stunning and thought-provoking sci-fi film. Its exploration of space and time, combined with Hans Zimmers score, creates an unforgettable experience.', 1, '{"title":"Interstellar","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg","id":157336,"overview":"The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.","release_date":"2014-11-05","rating":8.4,"vote_count":35858,"original_language":"en"}', 10),
(12, 'The Mandalorian', 'TV Show', 5, 'The Mandalorian Review', 'John Doe', 'The Mandalorian is a fantastic addition to the Star Wars universe, offering a fresh perspective and new characters. Its production quality and storytelling are top-tier.', 1, '{
        "title": "The Mandalorian",
        "media_type": "tv",
        "release_date": "2019-11-12",
        "poster_path": "https://image.tmdb.org/t/p/original//eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
        "id": "82856",
        "overview": "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
        "rating": "8.4",
        "vote_count": "10079",
        "original_language": "en"
    }', 11),
(13, 'The Boys', 'TV Show', 4, 'The Boys Review', 'John Doe', 'The Boys is a dark and satirical series that provides a unique take on superheroes. Its gritty narrative and complex characters make it a compelling watch.', 1, '{
        "title": "The Boys",
        "media_type": "tv",
        "release_date": "2019-07-25",
        "poster_path": "https://image.tmdb.org/t/p/original//2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
        "id": "76479",
        "overview": "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
        "rating": "8.5",
        "vote_count": "10613",
        "original_language": "en"
    }', 12),
(14, 'Avatar', 'Movie', 4, 'Avatar Review', 'John Doe', 'Avatar is a visually spectacular film that immerses viewers in the world of Pandora. Its groundbreaking special effects and environmental message are noteworthy.', 1, '{"title":"Avatar","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/vbtsge1cmZ3iMXV016pVqba1VD0.jpg","id":19995,"overview":"In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.","release_date":"2009-12-15","rating":7.6,"vote_count":31602,"original_language":"en"}', 13),
(15, 'Avengers: Endgame', 'Movie', 5, 'Avengers: Endgame Review', 'John Doe', 'Avengers: Endgame is an epic and satisfying conclusion to the Marvel saga. Its emotional depth and action-packed sequences make it a fitting end to the series.', 1, '{"title":"Avengers: Endgame","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/bR8ISy1O9XQxqiy0fQFw2BX72RQ.jpg","id":299534,"overview":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos'' actions and restore order to the universe once and for all, no matter what consequences may be in store.","release_date":"2019-04-24","rating":8.2,"vote_count":25731,"original_language":"en"}', 14),
(48, 'Captain America: The First Avenger', 'Movie', 5, 'Incredible Movie!', 'Dakota Gagne', 'Captain America: The First Avenger is a heartfelt and inspiring film that tells the origin story of Steve Rogers. The film''s period setting and strong performances make it a standout entry in the Marvel Cinematic Universe.', 20, '{"title":"Captain America: The First Avenger","media_type":"movie","release_date":"2011-07-22","poster_path":"https://image.tmdb.org/t/p/original//vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg","id":1771,"overview":"During World War II, Steve Rogers is a sickly man from Brooklyn who''s transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler''s ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.","rating":7,"vote_count":21481,"original_language":"en"}', 25),
(16, 'The Crown', 'TV Show', 4, 'The Crown Review', 'John Doe', 'The Crown is a well-acted and beautifully produced series that offers an intimate look at the British monarchy. Its historical accuracy and performances are commendable.', 1, '{
        "title": "The Crown",
        "media_type": "tv",
        "release_date": "2016-11-04",
        "poster_path": "https://image.tmdb.org/t/p/original//1M876KPjulVwppEpldhdc8V4o68.jpg",
        "id": 65494,
        "overview": "The gripping, decades-spanning inside story of Her Majesty Queen Elizabeth II and the Prime Ministers who shaped Britain''s post-war destiny. \n\nThe Crown tells the inside story of two of the most famous addresses in the world – Buckingham Palace and 10 Downing Street – and the intrigues, love lives and machinations behind the great events that shaped the second half of the 20th century. Two houses, two courts, one Crown.",
        "rating": "8.2",
        "vote_count": "2088",
        "original_language": "en"
    }', 15),
(17, 'Sherlock', 'TV Show', 5, 'Sherlock Review', 'John Doe', 'Sherlock is a brilliant and captivating modern adaptation of the classic detective stories. Benedict Cumberbatchs portrayal of Sherlock Holmes is exceptional.', 1, '{
        "title": "Sherlock",
        "media_type": "tv",
        "release_date": "2010-07-25",
        "poster_path": "https://image.tmdb.org/t/p/original//7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
        "id": 19885,
        "overview": "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
        "rating": 8.5,
        "vote_count": 5480,
        "original_language": "en"
    }', 16),
(18, 'Black Mirror', 'TV Show', 4, 'Black Mirror Review', 'John Doe', 'Black Mirror is a dark and thought-provoking anthology series that explores the impact of technology on society. Each episode presents a unique and often unsettling narrative.', 1, '{
        "title": "Black Mirror",
        "media_type": "movie",
        "release_date": "2011-06-20",
        "poster_path": "https://image.tmdb.org/t/p/original//fYi4BQhoj2ay3oJwT2x8kMNHpds.jpg",
        "id": 452830,
        "overview": "A nameless drifter navigates a barren landscape punctuated by satellite dishes, radio towers and droning airplanes. Stopping periodically in anonymous hotel rooms, she makes attempts to connect to an unidentified second party.",
        "rating": 7.6,
        "vote_count": 53,
        "original_language": "en"
    }', 17),
(19, 'The Godfather', 'Movie', 5, 'The Godfather Review', 'John Doe', 'The Godfather is a cinematic masterpiece that delves into the world of organized crime. Its storytelling, direction, and performances are unparalleled.', 1, '{"title":"The Godfather","media_type":"movie","poster_path":"https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg","id":238,"overview":"Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.","release_date":"1972-03-14","rating":8.7,"vote_count":20758,"original_language":"en"}', 18),
(25, 'Deadpool & Wolverine', 'Movie', 5, 'Amazing <3', 'John Doe', 'Deadpool and Wolverine are an unstoppable duo! The chemistry between Ryan Reynolds and Hugh Jackman is off the charts, delivering a perfect blend of humor, action, and heartfelt moments. The storyline is engaging, the action sequences are top-notch, and the witty banter keeps you entertained from start to finish. This movie is a must-watch for any Marvel fan. 5 stars!
', 1, '{"title":"Deadpool & Wolverine","media_type":"movie","release_date":"2024-07-24","poster_path":"https://image.tmdb.org/t/p/original//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg","id":533535,"overview":"A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.","rating":7.7,"vote_count":6114,"original_language":"en"}', 19),
(27, 'Rick and Morty', 'Tv', 5, 'Wonderful Show', 'John Doe', 'Ohmahgawd this show is great. Never a dull moment. And like 0 real life drama around the voice actors!', 1, '{"title":"Rick and Morty","media_type":"tv","release_date":"2013-12-02","poster_path":"https://image.tmdb.org/t/p/original//gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg","id":60625,"overview":"Rick is a mentally-unbalanced but scientifically gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty''s already unstable family life, these events cause Morty much distress at home and school.","rating":8.7,"vote_count":9849,"original_language":"en"}', 20),
(29, 'The Land Before Time', 'Movie', 5, 'Childhood Classic', 'John Doe', 'I remember watching this as a kid and loving it. One of my favourites from childhood. Rewatching it is always enjoyable. Its a must watch with your kids!', 1, '{"title":"The Land Before Time","media_type":"movie","release_date":"1988-11-18","poster_path":"https://image.tmdb.org/t/p/original//7phV1ETZnQrLsEeuk4hNeceEl25.jpg","id":12144,"overview":"An orphaned brontosaurus named Littlefoot sets off in search of the legendary Great Valley. A land of lush vegetation where the dinosaurs can thrive and live in peace. Along the way he meets four other young dinosaurs, each one a different species, and they encounter several obstacles as they learn to work together in order to survive.","rating":7.1,"vote_count":2529,"original_language":"en"}', 21),
(45, 'The Avengers', 'Movie', 3, 'Awesome Mashup!', 'Dakota Gagne', 'The Avengers is a thrilling and action-packed film that brings together some of Marvel''s most iconic superheroes. The chemistry between the characters and the epic battle scenes make it a must-watch for any superhero fan.', 20, '{"title":"The Avengers","media_type":"movie","release_date":"2012-04-25","poster_path":"https://image.tmdb.org/t/p/original//RYMX2wcKCBAr24UyPD7xwmjaTn.jpg","id":24428,"overview":"When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!","rating":7.7,"vote_count":30984,"original_language":"en"}', 23),
(46, 'Iron Man', 'Movie', 5, 'Great Movie!', 'Dakota Gagne', 'Iron Man is a groundbreaking film that kickstarted the Marvel Cinematic Universe. Robert Downey Jr.''s portrayal of Tony Stark is charismatic and engaging, making it a standout superhero origin story.', 20, '{"title":"Iron Man","media_type":"movie","release_date":"2008-04-30","poster_path":"https://image.tmdb.org/t/p/original//78lPtwv72eTNqFW9COBYI0dWDJa.jpg","id":1726,"overview":"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.","rating":7.6,"vote_count":26498,"original_language":"en"}', 24),
(49, 'The Incredible Hulk', 'Movie', 3, 'Pretty Solid Movie!', 'Dakota Gagne', 'The Incredible Hulk is an intense and action-packed film that delves into the struggles of Bruce Banner. The film''s special effects and thrilling sequences make it a solid addition to the Marvel Cinematic Universe.', 20, '{"title":"The Incredible Hulk","media_type":"movie","release_date":"2008-06-12","poster_path":"https://image.tmdb.org/t/p/original//gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg","id":1724,"overview":"Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him: the Hulk. But when the military masterminds who dream of exploiting his powers force him back to civilization, he finds himself coming face to face with a new, deadly foe.","rating":6.2,"vote_count":11802,"original_language":"en"}', 26),
(50, 'Chernobyl', 'Tv', 5, 'A Must Watch!', 'Dakota Gagne', 'Chernobyl is a gripping miniseries that dramatizes the events of the 1986 nuclear disaster. The show''s attention to detail, powerful storytelling, and exceptional performances make it a haunting and unforgettable experience.', 20, '{"title":"Chernobyl","media_type":"tv","release_date":"2019-05-06","poster_path":"https://image.tmdb.org/t/p/original//7vcwOySsqeyEdmfHQNT5jHCL2gb.jpg","id":87108,"overview":"The true story of one of the worst man-made catastrophes in history: the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.","rating":8.7,"vote_count":6460,"original_language":"en"}', 27),
(51, 'Deadpool', 'Movie', 4, 'Great Tv Show', 'Momma G', 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 32, '{"title":"Deadpool","media_type":"movie","release_date":"2016-02-09","poster_path":"https://image.tmdb.org/t/p/original//3E53WEZJqP6aM84D8CckXx4pIHw.jpg","id":293660,"overview":"The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.","rating":7.6,"vote_count":31219,"original_language":"en"}', 28),
(52, 'Westworld', 'Tv', 5, 'One of My Favourites', 'Dakota Gagne', 'Westworld is a thought-provoking series that explores the nature of consciousness and artificial intelligence. The show''s intricate plot, stunning visuals, and strong performances make it a standout in the sci-fi genre.', 20, '{"title":"Westworld","media_type":"tv","release_date":"2016-10-02","poster_path":"https://image.tmdb.org/t/p/original//8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg","id":63247,"overview":"A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.","rating":8,"vote_count":5527,"original_language":"en"}', 29),
(57, 'Iron Man 2', 'Movie', 4, 'Wonderful Sequel', 'Dakota Gagne', 'Nothing tops the original, but the sequel to Iron Man is still a must watch! Excited to see where the rest of the series goes!
', 20, '{"title":"Iron Man 2","media_type":"movie","release_date":"2010-04-28","poster_path":"https://image.tmdb.org/t/p/original//6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg","id":10138,"overview":"With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press and the public to share his technology with the military. Unwilling to let go of his invention, Stark, with Pepper Potts and James ''Rhodey'' Rhodes at his side, must forge new alliances – and confront powerful enemies.","rating":6.8,"vote_count":21073,"original_language":"en"}', 30),
(58, 'Iron Man 3', 'Movie', 5, 'Better Again!', 'Dakota Gagne', 'If I had to decide, I would rank the order #1, #3, #2. This one is compelling and engaging the whole time. Tony must face himself to come out on top in the end and it is all around wonderful!', 20, '{"title":"Iron Man 3","media_type":"movie","release_date":"2013-04-18","poster_path":"https://image.tmdb.org/t/p/original//qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg","id":68721,"overview":"When Tony Stark''s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.","rating":6.9,"vote_count":22244,"original_language":"en"}', 31),
(59, 'Thor: Ragnarok', 'Movie', 5, 'Really Funny!', 'Dakota Gagne', 'Never though Hulk and Thor would make such a wonderful combination! e r s d', 20, '{"title":"Thor: Ragnarok","media_type":"movie","release_date":"2017-10-02","poster_path":"https://image.tmdb.org/t/p/original//rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg","id":284053,"overview":"Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his home-world and the end of Asgardian civilization, at the hands of a powerful new threat, the ruthless Hela.","rating":7.6,"vote_count":20823,"original_language":"en"}', 32),
(60, 'Avengers: Infinity War', 'Movie', 4, 'Crazy Good Movie!', 'Dakota Gagne', 'Honestly refreshing to watch them lose. Make the entire series more human to me,', 20, '{"title":"Avengers: Infinity War","media_type":"movie","release_date":"2018-04-25","poster_path":"https://image.tmdb.org/t/p/original//7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","id":299536,"overview":"As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.","rating":8.2,"vote_count":29986,"original_language":"en"}', 33),
(65, 'Teen Wolf', 'Tv', 5, 'I would die for stiles', 'Savannah Kirkeby', 'Sarcasm..Skinny white boy? Sign me up! Cringy to watch but you gotta love it haha!', 22, '{"title":"Teen Wolf","media_type":"tv","release_date":"2011-06-05","poster_path":"https://image.tmdb.org/t/p/original//fmlMmxSBgPEunHS5gjokIej048g.jpg","id":34524,"overview":"Scott McCall, a high school student living in the town of Beacon Hills has his life drastically changed when he''s bitten by a werewolf, becoming one himself. He must henceforth learn to balance his problematic new identity with his day-to-day teenage life. The following characters are instrumental to his struggle: Stiles, his best friend; Allison, his love interest who comes from a family of werewolf hunters; and Derek, a mysterious werewolf with a dark past. Throughout the series, he strives to keep his loved ones safe while maintaining normal relationships with them.","rating":8.5,"vote_count":4297,"original_language":"en"}', 34);