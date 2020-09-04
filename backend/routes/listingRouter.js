const express = require('express');
const listingController = require('../controllers/listingController');

const router = express.Router();

router
  .route('/')
  .get(listingController.getAllListings)
  .post(listingController.postListing);

router
  .route('/:id')
  .get(listingController.getListing)
  .patch(listingController.updateListing)
  .delete(listingController.deleteListing);

module.exports = router;