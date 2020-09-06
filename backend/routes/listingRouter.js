const express = require('express');
const listingController = require('../controllers/listingController');

const router = express.Router();

// @GET- all listings 
// @POST- create listing
router
  .route('/')
  .get(listingController.getAllListings)
  .post(listingController.postListing);

// @GET- one listing
// @PATCH- update listing
// @DELETE- delete listing
router
  .route('/:id')
  .get(listingController.getListing)
  .patch(listingController.updateListing)
  .delete(listingController.deleteListing);

module.exports = router;