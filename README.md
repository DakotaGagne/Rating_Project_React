# Ratingly React Social Media Project

## Description

This project is a social media application built with React, Postgres, and ExpressJS. It allows users to create accounts, log in, and interact with posts. Users can create, edit, and delete posts, as well as view posts from other users. All posts are designed to be ratings and reviews for movies and TV Shows. This application also makes use of the TMDB API to fetch data about the media, including synopsis and poster image, to be displayed to the user.

I used React as a way to showcase my understanding of it, as well as postgress and express. I wanted to make a project that specifically used these tools and technologies, and demonstrate how they can all work together to accomplish something complete. I also wanted to make a secure login system that can not be reasonably hacked or exploited. This project allowed me to both demonstrate and grow my skils and experience with each techcnology and tool, and bring everything together in a way I am pleased with!

Most of the challenges I faced were related to the communication between client-server, server-db, and server-publicAPI. In each situation, the first attempt often proved unsuccessful, and I had to think outside the box to make it work while still suiting my needs. The biggest challenge I faced overall was the transition to actually hosting the project as a site on Render. React behaves differently in dev mode than it does as a static site, and using localhost for client and server is very different than using 2 different unique domains. In the end I restructured much of the communication between server and client, as well as how I handled the pages on React.

In the future I hope to fully implement the Oauth Sign In system to the hosted project. While it worked flawlessly when hosted locally, it has proved to behave very different while hosted on Render.

## Features

- User authentication with GitHub and Google OAuth (Currently Not Working Outside of a Local Environment)
- Create, edit, and delete posts
- Database Storage of Users and Posts
- Real-time server communication status
- Responsive design (Mobile First Approach)

## Technologies Used

- PERN Stack
  - Postgres, ExpressJS, ReactJS, NodeJS
- Other Technologies
  - Vite
  - Passport
  - TMDB API
  - Bcrypt
  - Bootstrap
  - Material UI

## Usage

- While you may feel free to clone the repository and use it as you wish, the project is not designed for easy plug and play cloning
- Many .env variables will be missing, access to TMDB API, Postgres DB, and Oauth login will not work unless you make your own accounts and variables
- This is a project meant to showcase my own abilities with the relevant technologies, and as such I have no intentions on making this easy to clone and reuse
- If you wish to use the application for its intented purpose, it is hosted on Render and can be freely accessed (I ask that you please keep posts appropriate however). The link will be below

## Hosting

- This project is currently being hosted at [ratingly.onrender.com](https://ratingly.onrender.com). Feel free to check it out! If you notice bugs or issues, please let me know via a submitted issue on the github page, or email me at 'dakotaevan10@gmail.com'

## Contributing

No major changes are planned for this project, I only wish to improve its current state and patch any bugs discovered. Please create an issue on github if you discover any bugs or errors!

## License

This project is licensed under the MIT License.
