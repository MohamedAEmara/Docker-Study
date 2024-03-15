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
const DB_PORT = 5432;           // Default for postgres
const DB_HOST = 'postgres'      
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//     .connect(URI)
//     .then(() => console.log('Connected to DB........'))
//     .catch(err => console.log('Failed to connect to DB ' + err));
    

// Connect to Postgres
const { Client} = require('pg');
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
    connectionString: connectionString,
});

console.log(client);

client
    .connect()
    .then(() => console.log('Connected to PostgreSQL...'))
    .catch((err) => console.log('Failed to connect to PostgreSQL...', err));



app.get('/', (req, res) => {
    // Cash this key with this value in memory when user request this route..
    redisClient.set('products', 'products...');
    res.send('<h1> Another line </h1>');
})


app.get('/data', async (req, res) => {
    // Get the cashed products..
    const products = await redisClient.get('products');
    res.send(`<h1>${products}</h1>`)
})
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})