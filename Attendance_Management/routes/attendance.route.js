'use strict'

const express = require('express');
let AttendanceRoute = express.Router();

const {
    getCheckAttendance,
    postAttendance
} = require('../controllers/attendance.controller');

AttendanceRoute.post('/', postAttendance);
AttendanceRoute.get('/check', getCheckAttendance);

module.exports = AttendanceRoute;