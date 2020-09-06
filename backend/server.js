const dotenv = require('dotenv');
const mongoose = require('mongoose');

// UNCAUGHT EXCEPTION ERROR HANDLER
process.on('uncaughtException',err=>{
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!⚡ Shutting down...');
});

dotenv.config({ path: './config.env' });

const app = require("./app");

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// CONNECT TO DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB successfully connected'));

// LISTEN FOR SERVER
const port = process.env.PORT || 5001;
const server = app.listen(port, () => console.log(`App listening on port ${port}`));

// UNHANDLED REJECTION ERROR HANDLER
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!⚡ Shutting down...');
  server.close(() => {
    process.exit(1);
  })
});