const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Init app
const app = express();


// Connect to Redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    // url: 'redis://<USERNAME>:<PASSWORD>@<HOST>:<PORT>'
});
redisClient.on('error', (err) => console.log('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected to redis...'));
redisClient.connect();

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
})