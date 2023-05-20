'use strict'

const dotenv   = require('dotenv').config();
const express  = require('express');
const session  = require('express-session');

const { initializePassport } = require('./config/db.config');
const AttendanceRoute        = require('./routes/attendance.route');
const { LoginRoute, LogoutRoute, DashboardRoute } = require('./routes/auth.route');

const app = express();

const port = dotenv.parsed.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: dotenv.parsed.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('public'));
initializePassport(app);

// Routes 
app.use('/attendance', AttendanceRoute);
app.use('/login', LoginRoute);
app.use('/logout', LogoutRoute);
app.use('/dashboard', DashboardRoute);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//app.get('/device', (req, res) => {
//    res.sendFile(__dirname + '/public/device.html');
//});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});