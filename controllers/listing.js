const Listing = require("../models/listing.js");

module.exports.index =async (req, res) => {
   const allListing= await Listing.find({});
   res.render("listing/index.ejs",{allListing});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.showFrom = async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing) {
     req.flash("error","Listing is Not Exist..");
     res.redirect("/listing");
    }
    res.render("listing/show.ejs",{listing});
};
module.exports.Create = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New Listing Added..");
    console.log(newListing);
    res.redirect(`/listings`);
};

module.exports.edit = async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
     req.flash("error","Listing is Not Exist..");
     res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{listing});
};

module.exports.update = async(req, res) => {
    let {id}= req.params;
    
     await Listing.findByIdAndUpdate(id, {...req.body.listing}); 
    req.flash("success","Listing Updated..");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async(req, res) => {
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted..");
    res.redirect('/listings');
};
