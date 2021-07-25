const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const dogs = require('./routes/dogs');

const app = express();

// Connect Database
connectDB();

// cors handling logic
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('./routes/dogs', dogs);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));