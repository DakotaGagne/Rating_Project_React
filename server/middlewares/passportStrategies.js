import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

// ! local still not working
// ! will need to check duplicate usernames for local manually (not done yet)

export default function passportSetup(pg, bcrypt) {

    async function dbQuery(profile, type) {
        let result = {err: null, profile: null};
        const userCheck = await pg.query('SELECT * FROM users WHERE oauthid = $1', [profile.id]);
        if(userCheck.rows.length > 0){
            result.profile = userCheck.rows[0];
        } else {
            const pgRes = await pg.query('INSERT INTO users (username, oauth, oauthid) VALUES ($1, $2, $3) RETURNING *', [profile.displayName, type, profile.id]);
            if(pgRes.rows.length > 0){
                result.profile = pgRes.rows[0];
            } else {
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
                const pgRes = await pg.query('SELECT * FROM public.users WHERE username = $1', [username]);
                if(pgRes.rows.length > 0){
                    const user = pgRes.rows[0];
                    const storedHashedPassword = user.password;
                    bcrypt.compare(password, storedHashedPassword, (err, result) => {
                        if(err){
                            console.error("Error comparing passwords: ", err);
                            return cb(err);
                        } else {
                            if(result){
                                console.log("User signed in");
                                return cb(null, user);
                            } else {
                                return cb(null, false);
                            };
                        };
                    });
                } else {
                    console.error("User not found");
                    return cb(null, false);
                };
            } catch(err) {
                console.error("Error when querying database: ", err);
                return cb(err);
            };
        })
    );

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
        },
        async function(accessToken, refreshToken, profile, cb) {
            const result = await dbQuery(profile, "google");
            if(result.profile){
                cb(result.err, result.profile);
            } else {
                cb(result.err);
            }
        }
    ));

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
            const result = await dbQuery(profile, "github");
            if(result.profile){
                cb(result.err, result.profile);
            } else {
                cb(result.err);
            }
        }
    ));
    
    passport.serializeUser((user, cb) => cb(null, user));
    
    passport.deserializeUser((user, cb) => cb(null, user));
}