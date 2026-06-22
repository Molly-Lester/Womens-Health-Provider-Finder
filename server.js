const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Loneranger',
    database: 'clinics_database'
});

db.connect((err) => {
    if (err) {
        console.log('DB connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});



app.get('/', (req, res) => {
    res.send('API is working');
});

app.get('/clinics', (req, res) => {
    db.query('SELECT * FROM clinics', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

app.get('/clinics/concern/:name', (req, res) => {
    const concernName = req.params.name;

    const sql = `
        SELECT c.*
        FROM clinics c
        JOIN clinicconcerns cc ON c.clinic_id = cc.clinic_id
        JOIN health_concerns hc ON cc.concern_id = hc.concern_id
        WHERE hc.concern_name = ?
    `;

    db.query(sql, [concernName], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});


