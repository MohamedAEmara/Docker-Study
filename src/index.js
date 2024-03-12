const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Init app
const app = express();


// Connect to Redis
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected to redis...'));
redisClient.connect();
console.log('Test Test');

// Connect DB
const DB_USER = 'root'
const DB_PASSWORD = 'example'
const DB_PORT = 27017;          // Default for mongoDB
const DB_HOST = 'mongo'    // From docker inspect
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(() => console.log('Connected to DB........'))
    .catch(err => console.log('Failed to connect to DB ' + err));
    
    app.get('/', (req, res) => {
        res.send('<h1> Another line </h1>');
    })

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
        console.log('Test Test Test');
})