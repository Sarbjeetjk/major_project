const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlity/wrapAsync");
const ExpressError = require("../utlity/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require('../models/listing.js');
const {isLoggedIn} = require("../middleware.js")


const validateListing = (req,res ,next)=>{
    let{error} = listingSchema.validate({ listing: req.body.listing });
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else {
        next();
    }
};


//index route
router.get('/', wrapAsync(async (req, res) => {
   const allListing= await Listing.find({});
   res.render("listing/index.ejs",{allListing});
})
);

//crerate a new lising
router.get("/new",isLoggedIn, (req, res) => {
    res.render("listing/new.ejs");
});


//show route
router.get('/:id',wrapAsync( async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
     req.flash("error","Listing is Not Exist..");
     res.redirect("/listing");
    }
    res.render("listing/show.ejs",{listing});
}
));

// create post route
router.post('/',isLoggedIn,validateListing,wrapAsync( async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Added..");
    console.log(newListing);
    res.redirect(`/listings`);
})
);


//edit route
router.get('/:id/edit',isLoggedIn,wrapAsync( async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
     req.flash("error","Listing is Not Exist..");
     res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{listing});
})
);

//update route
router.put('/:id',isLoggedIn,validateListing, wrapAsync( async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators:true, new:true});
    console.log(listing);
    req.flash("success","Listing Updated..");
    res.redirect(`/listings/${listing._id}`);
})
);

//delete route
router.delete('/:id',isLoggedIn,wrapAsync( async(req, res) => {
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted..");
    res.redirect('/listings');
})
);

module.exports = router;