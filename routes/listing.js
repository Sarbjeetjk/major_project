const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, IsOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage});


router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  // create post route
  .post(isLoggedIn,
    upload.single('listing[image]')
   ,validateListing,wrapAsync(listingController.Create )
    
  );

//crerate a new lising
router.get("/new",isLoggedIn,listingController.renderNewForm );

router.route("/:id")
 //show route
 .get(wrapAsync(listingController.showFrom))
 //update route
 .put(isLoggedIn,IsOwner,upload.single('listing[image]'),validateListing, wrapAsync(  listingController.update))
 //delete route
 .delete(isLoggedIn,IsOwner,wrapAsync(  listingController.delete)
 );

//edit route
router.get('/:id/edit',isLoggedIn,IsOwner,wrapAsync( listingController.edit));

module.exports = router;