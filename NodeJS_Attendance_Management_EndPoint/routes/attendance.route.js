'use strict'

const express = require('express')
let attendance = express.Router();

const {
    getCheckAttendance,
    postAttendance
} = require('../controllers/attendance.controller');

attendance.post('/', postAttendance);
attendance.get('/check', getCheckAttendance);

module.exports = attendance;