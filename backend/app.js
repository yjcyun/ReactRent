const express = require('express');
const morgan = require('morgan');
const listingRouter = require('./routes/listingRouter');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

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

// 3) Error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

module.exports = app;