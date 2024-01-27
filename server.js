const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
app.use('/', require('./routes'));

// Error handling
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Caught Exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Initialize MongoDB
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        // Start the server after initializing the database
        app.listen(port, () => {
            console.log(`Database is listening, and node is running on port ${port}`);
        });
    }
});
