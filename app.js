require("dotenv").config();
require("./database/client");
const cors = require("cors");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

module.exports = app;
