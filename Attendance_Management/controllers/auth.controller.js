const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const authenticateUser = (req, res, next) => {
    // Perform any additional authentication logic if needed
    next();
};

module.exports = { ensureAuthenticated, authenticateUser };