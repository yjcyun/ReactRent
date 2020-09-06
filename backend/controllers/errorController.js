const AppError = require("../utils/appError");

// Incorrect route error
const handleCastErrorDB = err => {
  const message = `Invalide ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

// Duplicate field error
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicated field value: ${value}. Please use anoother value`;
  return new AppError(message, 400);
}

// Incorrect validation error
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400)
}

// Send error in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err
  });
}

// Send error in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR📛', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // DEVELOPMENT ERROR HANDLER
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
    // PRODUCTION ERROR HANDLER
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
    sendErrorProd(error, res);
  }
}

module.exports = globalErrorHandler