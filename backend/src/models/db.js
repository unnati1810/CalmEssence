const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');
const mongoose = require('mongoose');
require('dotenv').config();

let connection;

async function initializeConnection() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database');
    } catch (err) {
        console.error('Unable to connect to MySQL:', err);
    }
}

function initializeMongoDBConection() {
    mongoose.connect("mongodb+srv://sidhu97ss:incorrectPassword@cluster1.2chpe4b.mongodb.net/?appName=Cluster1", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });
}

initializeConnection();
initializeMongoDBConection();

module.exports = {
    mongoose,
    getConnection: () => connection,
};
