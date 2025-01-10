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

- I want to use react - Done
- I want to use express - Done
- I want them to communicate - Done
- I want to use postgres or sqlite for database - Done
- I want secure storage of passwords in database - Done
- I want administration control over all the posts (the ability to delete only if the logged in user is me) - Done
- I want homepage to be the posts - Done
- I want login / register to be the same page, with dynamic logic - Done
- I want to use hooks, components, etc - Done
- I dont want to have to make my own css (steal components etc) - Done
- I want the basic usage to be:

  - Open site, see posts made - Done
  - Have a nav bar to go to the login / register page, home page, account page, make a post - Done
    - if home page, make post page, or acct page is selected without being signed in, go to login page - Done
  - Login / Register page is simple log in form - Done
  - Account page shows you your posts, letting you edit or delete them - Done
    - Maybe let change username or password - Not Done
  - Admin page built into main page if I am the one logged in - Made it in Profile page instead
  - Post themselves should contain:
    - Media Name (corrected to exact name of api return) - Done
    - Media Type (Tv Show or Movie) - Done
    - Rating (/5 or /10) (Represent with stars) - Done
    - Author of Post (username [automatic]) - Done
    - Description of rating - Done
  - Show posts by page (arrows to navigate at top and bottom [identical], with page 1, 2, 3, ..., 20 and a choice of 10, 20, or 50 posts per page) - Not Done (Not sure it will be)
  - If feeling fancy, add filter feature to posts, otherwise don't bother - Not Done (instead maybe make author clickable and see just that persons posts)

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

# Final Cleanup Notes

- Make login and create post error messages more appropriate to the situation (wrong username or password, etc) - Should be done
- Make sure that post creation api searcher has no errors even when some data is missing from movies - Might be good (need to confirm)
- Reconsider box shadows (especially in create post)
- Credits page Missing
- Media Details font not scaling with window size
- Make mobile variable determined by screen size and by if it is actually a mobile device
- Need to make it more mobile friendly

  - Get rid of the media description element if screen a certain width
  - PostHoriz becomes post vertical
    - Take media details and posthoriz and merge them for post vertical

- Maybe make pages for posts on main page (and profile too)
- Maybe add a filter to check username and post content for inappropriate words
