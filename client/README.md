# Production Errors / Bugs / To DO

- (Fixed) May have a delay for api fetches, render a loading msg until the fetch is complete (especially profile and home page) - This is done for profile and home page, I dont know if it needs to exist elsewhere yet
- (Fixed?) Maybe make the fetch for posts happen every once in a while (at least schedule it for when it fails) - Timeout created for posts on main page, if there is an issue or error, it re fetches after 1 second
- (Fixed) Profile becoming username in navbar should only occur if username is valid. Use profile otherwise - Should be fixed
- (Fixed) Delete account not working - Possibly fixed
- (Fixed) Redirecting setup in react causing not found errors when reloading page. Smth to do with it being deployed as a static site I assume - Mostly fixed, need redirecting to go back to the /#/page
- (Fixed) Create post allowed repeatedly, make sure cant spam - Should be fixed - Not fixed - Should actually be fixed now
- (Fixed) Poster not found should appear on the vertical posts if no poster - Done
- (Fixed) Word wrapping needed on posts for large words (no spaces) - Should be done

  - (Fixed) Maybe make a ping to server that occurs once every second or so on the app.jsx page, and have a state variable that gets passed along that represents server communication (and on login page make a card like the loading one that says waiting for connection to server. login will be available shortly) (same with create page possibly)
  - (Fixed) Create post errors out first, then works (not every time either, only sometimes. initial suspicion is it has smth to do with server being asleep at the time. WIll need to troubleshoot further) (this might be tied to the ping idea)

- (Fixed) Posts db might need a time column to sort by instead of the id. Seems like now the id is being assigned old id values and messing up order

  - Time col added, need to update post creation and sorting
  - Should be fixed

- (Fixed) Make error message more specific for post creation (try again in a minute, the server might need time to wake up)
- (Fixed) I need to add an accept cookies modal
- (FIXED) When a backup and restore is made on the database, it resets the id counter (starts at 1). This causes errors until the counter counts up all the way to the new value (no real way around this, might be best to pay for pg)

# Persistent Issues

- Github and Google ouath need links fixed - Sign in working, authentication is failing - Auth still failing, no solutions yet (possible override by jwt tokenizing oauth as well)
- (Fixed) Maybe make login page accessible only after confirming server is awake, or msg that it may take up to a minute for the server to respond
- Make the above happen for create post page as well (should actually be happening)

# Future Additions

- Show posts by page (arrows to navigate at top and bottom [identical], with page 1, 2, 3, ..., 20 and a choice of 10, 20, or 50 posts per page) - Not Done (Not sure it will be)
- If feeling fancy, add filter feature to posts, otherwise don't bother - Not Done (instead maybe make author clickable and see just that persons posts)

# Final Steps

- Clean up all readme's, stick with one for server and client and make it well detailed
- Create resume section about project
- Add to portfolio
- Apply for jobs!
- Maybe remake portfolio with React (as a static site)
