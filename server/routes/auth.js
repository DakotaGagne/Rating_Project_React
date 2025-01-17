/*
This file contains the routes for the authentication of the user. It contains the following routes:
  - /auth/login/success: This route is used to check if the user has successfully authenticated. It returns a JSON object with the user details and the authentication type.
  - /auth/logout: This route is used to logout the user.
  - /auth/login/failure: This route is used to check if the user has failed to authenticate. It returns a JSON object with the message "Login failed".
  - /auth/google: This route is used to authenticate the user using Google OAuth.
  - /auth/google/callback: This route is used to handle the callback from Google OAuth.
  - /auth/github: This route is used to authenticate the user using Github OAuth.
  - /auth/github/callback: This route is used to handle the callback from Github OAuth.
  - /auth/local/login: This route is used to authenticate the user using local authentication.
  - /auth/local/register: This route is used to register the user using local authentication.
*/


// IMPORTS
import express from "express";
import passport from "passport";
import register from './user/register.js';
import delete_user from './user/delete_user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// CONFIG
dotenv.config();

// ROUTER
const router = express.Router();
// CLIENT URL FOR REDIRECT

// Get Routes Router
router.get("/login/success", (req, res) => {
  if(req.user){
    // Oauth Authentication
    console.log('req.user exists: ', req.user);
    res.status(200).json(
      {
        success: true,
        message: "User has successfully authenticated",
        user: req.user,
        type: req.user.oauth
      }
    );
  } else if(req.headers.authorization!=undefined){
    console.log('req.headers.authorization exists: ', req.headers.authorization);
    // Local Authentication
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err){
        console.error('Error verifying token');
        res.status(401).json({ success: false, message: 'User not authenticated' });
      } else {
        res.status(200).json({ success: true, message: 'User authenticated', user: user, type: 'local' });
      }
    });
  } else {
    console.log('No user or token found');
    res.status(401).json(
      {
        success: false,
        message: "User has not authenticated"
      }
    );
  }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

router.get("/login/failure", (req, res) => {
  res.status(401).json(
    {
      success: false,
      message: "Login failed"
    }
  );
});


// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { 
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/auth/login/failure' 
}));

// Github Auth
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', passport.authenticate('github', { 
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/auth/login/failure' 
}));

// Local Auth
router.post('/local/login', passport.authenticate('local') , async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('User not found');
    }
    const token = jwt.sign(
      req.user, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    res.status(200).json(token);
    return;
  } catch (err) {
    console.error('Error logging in user: ', err);
    res.status(500).json({ success: false, message: 'Error logging in user' });
  }
});

// Register User
router.post('/local/register', (req, res) => register(req, res));

// Delete User
router.delete('/delete', (req, res) => delete_user(req, res));


// EXPORTS
export default router;