const Listing = require("../models/listingModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// GET ALL LISTINGS
exports.getAllListings = catchAsync(async (req, res, next) => {
  // Query parameters
  const features = new APIFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const listings = await features.query;

  res.status(200).json({
    status: 'success',
    results: listings.length,
    data: { listings }
  })
})

exports.getListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if(!listing) {
    return (new AppError('No listing found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { listing }
  })
})

exports.postListing = catchAsync(async (req, res, next) => {
  const newListing = await Listing.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { listing: newListing }
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!listing) {
    return (new AppError('No listing found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { listing }
  });
})

exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);

  if(!listing) {
    return (new AppError('No listing found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})