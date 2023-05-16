const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const db = new sqlite3.Database('asistencia.db');

db.run(`
  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    subject TEXT,
    date TEXT
  )
`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/attendance', (req, res) => {
    const { studentName, subject, date } = req.body;

    db.get(
        'SELECT * FROM attendance WHERE studentName = ? AND subject = ? AND date = ?',
        [studentName, subject, date],
        (err, row) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else if (row) {
                res.status(409).send('Attendance already submitted');
            } else {
                db.run(
                    'INSERT INTO attendance (studentName, subject, date) VALUES (?, ?, ?)',
                    [studentName, subject, date],
                    (err) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    }
                );
            }
        }
    );
});

app.get('/attendance/check', (req, res) => {

    if (isTeacher) {
        const subjectFilter = req.query.subject || '';
        const dateFilter = req.query.date || '';
        const studentFilter = req.query.student || '';

        let query = 'SELECT studentName, subject, date FROM attendance WHERE 1=1';

        if (subjectFilter) {
            query += ` AND subject LIKE '%${subjectFilter}%'`;
        }

        if (dateFilter) {
            query += ` AND date = '${dateFilter}'`;
        }

        if (studentFilter) {
            query += ` AND studentName LIKE '%${studentFilter}%'`;
        }

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.json(rows);
            }
        });
    } else {
        res.status(403).send('Access denied');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/management.html');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
