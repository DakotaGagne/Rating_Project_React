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

#### Need to add a delete account button to the profile page

# Production Errors / Bugs / To DO

- May have a delay for api fetches, render a loading msg until the fetch is complete (especially profile and home page) - This is done for profile and home page, I dont know if it needs to exist elsewhere yet
- Maybe make the fetch for posts happen every once in a while (at least schedule it for when it fails) - Timeout created for posts on main page, if there is an issue or error, it re fetches after 1 second
- Profile becoming username in navbar should only occur if username is valid. Use profile otherwise - Should be fixed
- Delete account not working - Possibly fixed
- Redirecting setup in react causing not found errors when reloading page. Smth to do with it being deployed as a static site I assume - Mostly fixed, need redirecting to go back to the /#/page
- Create post allowed repeatedly, make sure cant spam - Should be fixed - Not fixed - Should actually be fixed now
- Poster not found should appear on the vertical posts if no poster - Done
- Word wrapping needed on posts for large words (no spaces) - Should be done

- Maybe make login page accessible only after confirming server is awake, or msg that it may take up to a minute for the server to respond
  - Maybe make a ping to server that occurs once every second or so on the app.jsx page, and have a state variable that gets passed along that represents server communication (and on login page make a card like the loading one that says waiting for connection to server. login will be available shortly) (same with create page possibly)
  - Create post errors out first, then works (not every time either, only sometimes. initial suspicion is it has smth to do with server being asleep at the time. WIll need to troubleshoot further) (this might be tied to the ping idea)
- Make error message more specific for post creation (try again in a minute, the server might need time to wake up)
- Posts db might need a time column to sort by instead of the id. Seems like now the id is being assigned old id values and messing up order
- Github and Google ouath need links fixed - Sign in working, authentication is failing

# Changes done with last commit

- Commented out line 48 of app.jsx (timeout for authenticating user, feel like that isnt needed)
- Added ping mechanic to make sure login and create post only available upon confirmation of server connection
- Removed mobile var from header (incl all files that declare header)

# Prev Commit Changes

- Word Breaking added to posts

- Should have prevented spam post creation (cannot create more than 1 at a time)
- Fixed public folder to get the photos back for poster-not-found errors. Fixed the references of said images so VITE should be able to still reference them at build

- Loading msg for main and profile page implemented
  - This includes a change to the fetch in main page, where it confirms the fetch was valid, and retries if not
- Redirects checked to ensure working. Not sure if it will be diff online as opposed to offline (cant find an issue anymore so will have to wait and see)
- Account deletion fixed (should be anyways)
- Header says profile if waitin on acct info
