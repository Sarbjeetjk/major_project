const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utlity/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
const { validateReview,isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//reviews post route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.Create ));

// delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;