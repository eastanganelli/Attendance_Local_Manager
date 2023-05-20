const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`./config/admin_users.db`);

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    //db.run(`INSERT INTO users (id,username,password) VALUES (39068857,"Eze","12345")`);
});

const initializePassport = (app) => {
    passport.use(
        new LocalStrategy((username, password, done) => {
            db.get('SELECT * FROM users WHERE username = ?', username, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Usuario Incorrecto.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Constraseña Incorrecta.' });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        db.get('SELECT * FROM users WHERE username = ?', username, (err, user) => {
            done(err, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = { initializePassport };
