// server.js

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const employeeRouter = require("./routes/Employee");

const app = express();

// Init Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use('/api',userRouter);
app.use('/api', employeeRouter);

app.get("/",(req,res) => {
    res.send("Welcome!")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    // Connect Database
    connectDB();
    console.log(`Server is connected at port ${PORT}`)
});
