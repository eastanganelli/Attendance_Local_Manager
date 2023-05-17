'use strict'

const express = require('express');

const app = module.exports = express();
const port = 3000;

const attendance_routes = require('./routes/attendance.route');
const ip_routes = require('./routes/ip.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/attendance', attendance_routes);
app.use('/ip', ip_routes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/management.html');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});