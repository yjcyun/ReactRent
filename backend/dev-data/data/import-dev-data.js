const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Listing = require('../../models/listingModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful'));

const listings = JSON.parse(fs.readFileSync(`${__dirname}/listings-simple.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Listing.create(listings);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

// DELETE EXISTING DATA FROM DB
const deleteData = async () => {
  try {
    await Listing.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// node dev-data/data/import-dev-data.js --import
// node dev-data/data/import-dev-data.js --delete
console.log(process.argv);