const fs = require('fs');
const express = require('express');

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

const listings = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/listings-simple.json`));

// ROUTE HANDLERS
const getAllListings = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: listings.length,
    data: { listings }
  })
}

const getListing = (req, res) => {
  const listingId = req.params.id * 1;
  const listing = listings.find(el => el.id === listingId);
  if (!listing) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    status: 'success',
    data: { listing }
  })
}

const postListing = (req, res) => {
  const newId = listings[listings.length - 1].id + 1;
  const newListing = Object.assign({ id: newId }, req.body);

  listings.push(newListing);

  fs.writeFile(`${__dirname}/dev-data/data/listings-simple.json`, JSON.stringify(listings), err => {
    res.status(201).json({
      status: 'success',
      data: { listing: newListing }
    })
  })
}

const updateListing = (req, res) => {
  if (req.params.id * 1 > listings.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    status: 'success',
    data: { listing: '<To be updated...>' }
  })
}

const deleteListing = (req, res) => {
  if (req.params.id * 1 > listings.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}

// 3) Routes
const listingRouter = express.Router();
app.use('/api/v1/listings', listingRouter);

listingRouter
  .route('/')
  .get(getAllListings)
  .post(postListing);

listingRouter
  .route('/:id')
  .get(getListing)
  .patch(updateListing)
  .delete(deleteListing)

const port = 5000;
app.listen(port, () => console.log(`App listening on port ${5000}`))