const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');
const Todooperations = require('./Todooperations/todoOperations');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const allowedOrigins = [
    process.env.FrontendURL
]

app.use(cors({
  origin : allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Pass Redis client to router if needed
app.use('/todo', Todooperations);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
