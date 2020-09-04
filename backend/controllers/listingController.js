const fs = require('fs');

const listings = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/listings-simple.json`));

exports.getAllListings = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: listings.length,
    data: { listings }
  })
}

exports.getListing = (req, res) => {
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

exports.postListing = (req, res) => {
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

exports.updateListing = (req, res) => {
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

exports.deleteListing = (req, res) => {
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