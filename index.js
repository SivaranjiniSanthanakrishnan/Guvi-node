const express = require("express");
const dotenv = require("dotenv");
const mongo = require('./shared/connect');
const employeeRouter = require('./routes/employee');
const registerRouter = require('./routes/register');
const authorise = require('./module/authorize');
const studentRouter = require('./routes/student');

dotenv.config();
const app = express();
// To convert req.body into json format
app.use(express.json());
mongo.connect();

app.use('/register', registerRouter);
// app.use(authorise.AuthorizeUser);
app.use('/employee', employeeRouter);
app.use('/student', studentRouter);

app.listen(process.env.PORT || 3000);