const express = require('express');
const morgan = require('morgan');
const listingRouter = require('./routes/listingRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());
// Log HTTP request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Body parser
app.use(express.json());

// 2) Routes
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;