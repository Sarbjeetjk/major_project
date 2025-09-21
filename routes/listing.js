const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlity/wrapAsync");
const Listing = require('../models/listing.js');
const {isLoggedIn, IsOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");



//index route
router.get('/', wrapAsync(listingController.index));

//crerate a new lising
router.get("/new",isLoggedIn,listingController.renderNewForm );


//show route
router.get('/:id',wrapAsync(listingController.showFrom));

// create post route
router.post('/',isLoggedIn,validateListing,wrapAsync(listingController.Create ));

//edit route
router.get('/:id/edit',isLoggedIn,IsOwner,wrapAsync( listingController.edit));

//update route
router.put('/:id',isLoggedIn,IsOwner,validateListing, wrapAsync( listingController.update));

//delete route
router.delete('/:id',isLoggedIn,IsOwner,wrapAsync( listingController.delete)
);

module.exports = router;