import express from "express";
import passport from "passport";

import register from './user/register.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const CLIENT_URL = "http://localhost:5173";

// Get Routes Router
router.get("/login/success", (req, res) => {
  if(req.user){
    // Oauth Authentication
    res.status(200).json(
      {
        success: true,
        message: "User has successfully authenticated",
        user: req.user,
        type: req.user.oauth
      }
    );
  } else if(req.headers.authorization){
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
    res.redirect(CLIENT_URL);
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
  successRedirect: CLIENT_URL,
  failureRedirect: '/auth/login/failure' 
}));

// Github Auth
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', passport.authenticate('github', { 
  successRedirect: CLIENT_URL,
  failureRedirect: '/auth/login/failure' 
}));

router.post('/local/login', passport.authenticate('local', ) , async (req, res) => {
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

router.post('/local/register', (req, res) => register(req, res));



export default router;