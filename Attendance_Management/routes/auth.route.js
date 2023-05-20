const express = require('express');
const passport = require('passport');
const { authenticateUser, ensureAuthenticated } = require('../controllers/auth.controller');

const LoginRoute     = express.Router();
const LogoutRoute    = express.Router();
const DashboardRoute = express.Router();

LoginRoute.get('/', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Log In</button>
    </form>
  `);
});

LoginRoute.post('/', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

DashboardRoute.get('/', ensureAuthenticated, (req, res) => {
    //res.send(`<h1>Welcome to the dashboard, ${req.user.username}!</h1><a href="/logout">Log Out</a>`);
    res.sendFile(__dirname + '/management.html');
});

LogoutRoute.get('/', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

module.exports = { LoginRoute, LogoutRoute, DashboardRoute };