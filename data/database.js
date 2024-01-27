const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('DB is already initialized');
        return callback(null, database);
    }

    mongoose.connect(process.env.MONGODB_URI, { dbName: 'CSE341Project2' })
        .then((db) => {
            database = db;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
