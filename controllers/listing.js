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
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"...",filename);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    await newListing.save();
    req.flash("success","New Listing Added..");
    // console.log(newListing);
    res.redirect(`/listings`);
};

module.exports.edit = async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
     req.flash("error","Listing is Not Exist..");
     res.redirect("/listing");
    }
    let originalImageUrl=listing.image && listing.image.url ? listing.image.url : "";
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_200,w_250");
    res.render("listing/edit.ejs",{listing,originalImageUrl});
};

module.exports.update = async(req, res) => {
    let {id}= req.params;
    
      // Find the listing first
        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
        
        // Update basic listing data
        listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
        
        // Check if a new file was uploaded
        if (req.file && req.file.path) {
            
            listing.image = { url: req.file.path, filename: req.file.filename };
            await listing.save();
        }
        
    req.flash("success","Listing Updated..");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async(req, res) => {
    let {id}= req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted..");
    res.redirect('/listings');
};
