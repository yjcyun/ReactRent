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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const postUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

// 3) Routes
const listingRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/users', userRouter);

listingRouter
  .route('/')
  .get(getAllListings)
  .post(postListing);

listingRouter
  .route('/:id')
  .get(getListing)
  .patch(updateListing)
  .delete(deleteListing)
  
userRouter
  .route('/')
  .get(getAllUsers)
  .post(postUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

const port = 5000;
app.listen(port, () => console.log(`App listening on port ${5000}`))