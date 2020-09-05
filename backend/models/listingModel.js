const mongoose = require('mongoose');
const slugify = require('slugify');

const listingSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'This is a required field'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'This is a required field'],
    trim: true
  },
  sqft: {
    type: Number,
    // required: [true, 'This is a required field'],
    // min: [1, 'This field must be greater than 1']
  },
  garage: {
    type: Number,
    // required: [true, 'This is a required field']
  },
  bedrooms: {
    type: Number,
    // required: [true, 'This is a required field']
  },
  bathrooms: {
    type: Number,
    // required: [true, 'This is a required field']
  },
  price: {
    type: Number,
    required: [true, 'This is a required field'],
    min: [1, 'Price must be greater than 1']
  },
  postedDate: {
    type: Date,
    default: Date.now(),
    select: false
  },
  description: {
    type: String
  },
  imageCover: {
    type: String,
    // required: [true, 'Image cover is required']
  },
  images: [String]
});

// Slugify based on address
listingSchema.pre('save', function (next) {
  this.slug = slugify(this.address, { lower: true });
  next();
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;