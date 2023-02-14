const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connections

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_SECURITY_KEY}@clusterjobboy.xkxgypm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri);


async function run() {
    try {
        const usersCollection = client.db("jobboy-v2").collection('users');
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
    } finally {

    }
};

run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('JobBoy V2 Server is Running...')
});

app.listen(port, () => {
    console.log(`JobBoy V2 Running On ${port}`);
})