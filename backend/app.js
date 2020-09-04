const fs = require('fs');
const express = require('express');
const listingRouter = require('./routes/listingRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

// 2) Routes
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;


