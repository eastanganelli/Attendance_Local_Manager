'use strict'

const express = require('express');
let ip = express.Router();

const {
    getIP
} = require('../controllers/ip.controller');

ip.get('/', getIP);

module.exports = ip;