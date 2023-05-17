const ip = require('ip');

const getIP = (req, res) => {
    res.json(ip.address());
}

module.exports = {
    getIP
}