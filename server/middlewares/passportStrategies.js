/*
This file contains the passport strategies for Google, Github and Local authentication.
All strategies are set up to query the database for the user's information and return it to the client.
If the user does not exist in the database, a new user is created.
The local strategy is set up to compare the hashed password with the stored hashed password in the database using bcrypt.
The Google and Github strategies are set up to query the database for the user's information using their oauthid.
Google and Github strategies are set up to return the user's information to the client in the form of req.user.
Local strategy requires a cookie to store the session and user information.
*/

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';



export default function passportSetup(pg, bcrypt) {

    async function dbQuery(profile, type) {
        // Check if user exists in database
        let result = {err: null, profile: null};
        const userCheck = await pg.query('SELECT * FROM users WHERE oauthid = $1', [profile.id]);
        if(userCheck.rows.length > 0){
            // User exists
            // Return user information
            result.profile = userCheck.rows[0];
        } else {
            // User does not exist
            // Create new user
            const pgRes = await pg.query('INSERT INTO users (username, oauth, oauthid) VALUES ($1, $2, $3) RETURNING *', [profile.displayName, type, profile.id]);
            if(pgRes.rows.length > 0){
                // Return user information
                result.profile = pgRes.rows[0];
            } else {
                // Return error
                result.err = "Error creating user";
            };
        }
        return result;
    };

    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, cb) => {
            try {
                // Check if user exists in database
                const pgRes = await pg.query('SELECT * FROM public.users WHERE username = $1', [username]);
                if(pgRes.rows.length > 0){
                    // User exists
                    const user = pgRes.rows[0];
                    const storedHashedPassword = user.password;
                    // Compare hashed password with stored hashed password
                    bcrypt.compare(password, storedHashedPassword, (err, result) => {
                        if(err){
                            // Return error
                            console.error("Error comparing passwords: ", err);
                            return cb(err);
                        } else {
                            // Return user information
                            if(result){
                                console.log("User signed in");
                                return cb(null, user);
                            } else {
                                return cb(null, false);
                            };
                        };
                    });
                } else {
                    // User does not exist
                    console.error("User not found");
                    return cb(null, false);
                };
            } catch(err) {
                // Return error
                console.error("Error when querying database: ", err);
                return cb(err);
            };
        })
    );

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback`
        },
        async function(accessToken, refreshToken, profile, cb) {
            // Query database for user information
            const result = await dbQuery(profile, "google");
            if(result.profile){
                // Return user information
                cb(result.err, result.profile);
            } else {
                // Return error
                cb(result.err);
            }
        }
    ));

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `/auth/github/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
            // Query database for user information
            const result = await dbQuery(profile, "github");
            if(result.profile){
                // Return user information
                cb(result.err, result.profile);
            } else {
                // Return error
                cb(result.err);
            }
        }
    ));
    
    passport.serializeUser((user, cb) => cb(null, user)); // Serialize user
    
    passport.deserializeUser((user, cb) => cb(null, user)); // Deserialize user
}