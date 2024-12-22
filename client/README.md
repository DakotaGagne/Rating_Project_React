# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Inital Notes

I want this app to have multiple pages
A login system with oauth and manually account creation
Want to reference the logged in user anytime I need to navigate
No friends lists, just a single feed that is always readable (will be the home page)
Sorted by recency
User must sign in to create a post, and to edit or delete their posts
Might make this a ratings app for movies and tv shows, havent decided for sure
Want to use a public api somewhere (could use omdb api for movie and tv show lookups)
If I did, we should force the form to have to find a movie based on the title before making post
Maybe have a more info link in the posts related to the specific show they are talking about
When this gets clicked, somehow show the info we get from the api

This could easily get to be too much work and perfectionism etc, so here is what I want from this

- I want to use react
- I want to use express
- I want them to communicate
- I want to use postgres or sqlite for database
- I want secure storage of passwords in database
- I want administration control over all the posts (the ability to delete only if the logged in user is me)
- I want homepage to be the posts
- I want login / register to be the same page, with dynamic logic
- I want to use hooks, components, etc
- I dont want to have to make my own css (steal components etc)
- I want the basic usage to be:

  - Open site, see posts made
  - Have a nav bar to go to the login / register page, home page, account page, make a post
    - if home page, make post page, or acct page is selected without being signed in, go to login page
  - Login / Register page is simple log in form
  - Account page shows you your posts, letting you edit or delete them
    - Maybe let change username or password
  - Admin page built into main page if I am the one logged in
  - Post themselves should contain:
    - Media Name (corrected to exact name of api return)
    - Media Type (Tv Show or Movie)
    - Rating (/5 or /10) (Represent with stars)
    - Author of Post (username [automatic])
    - Description of rating
  - Show posts by page (arrows to navigate at top and bottom [identical], with page 1, 2, 3, ..., 20 and a choice of 10, 20, or 50 posts per page)
  - If feeling fancy, add filter feature to posts, otherwise don't bother

# Database

## Users

    - Account info
    - User name, password, oauth info, etc
    -

## Posts

- Media Name
- Media Type
- Author (username)
- Rating
- Content
