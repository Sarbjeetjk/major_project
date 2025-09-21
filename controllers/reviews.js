const Listing = require("../models/listing");
const Review = require("../models/review");

//for create a review
module.exports.Create = async(req,res)=> {
   let listing= await Listing.findById(req.params.id);
   let newReview = new Review(req.body.review);
   newReview.author =req.user._id;
   listing.reviews.push(newReview);

   await newReview.save();
   console.log(newReview);
   await listing.save();
   console.log("listing");
   req.flash("success","New Review Added..");
//    console.log("new review saved");
//    res.send("new review saved");
   res.redirect(`/listings/${listing._id}`)
};


//for delete review
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted..");
    res.redirect(`/listings/${id}`);
}; 