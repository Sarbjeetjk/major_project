const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index =async (req, res) => {
   const { q, category, minPrice, maxPrice, minRating } = req.query;
   const basicFilter = {};
   if (q) {
       basicFilter.$or = [
           { title: { $regex: q, $options: 'i' } },
           { description: { $regex: q, $options: 'i' } },
           { location: { $regex: q, $options: 'i' } },
           { country: { $regex: q, $options: 'i' } },
       ];
   }
   if (category) {
       basicFilter.category = category;
   }
   if (minPrice || maxPrice) {
       basicFilter.price = {};
       if (minPrice) basicFilter.price.$gte = Number(minPrice);
       if (maxPrice) basicFilter.price.$lte = Number(maxPrice);
   }

   // If filtering by rating, use aggregation to compute average rating
   if (minRating) {
       const pipeline = [
           { $match: basicFilter },
           { $lookup: { from: 'reviews', localField: 'reviews', foreignField: '_id', as: 'reviewsDocs' } },
           { $addFields: {
               avgRating: { $cond: [ { $gt: [ { $size: '$reviewsDocs' }, 0 ] }, { $avg: '$reviewsDocs.rating' }, null ] },
               reviewsCount: { $size: '$reviewsDocs' }
           } },
           { $match: { avgRating: { $ne: null, $gte: Number(minRating) } } },
       ];
       const docs = await Listing.aggregate(pipeline);
       return res.render('listing/index.ejs', {
           allListing: docs,
           q: q || '',
           category: category || '',
           minPrice: minPrice || '',
           maxPrice: maxPrice || '',
           minRating: minRating || '',
       });
   }

   const allListing= await Listing.find(basicFilter);
   res.render('listing/index.ejs', {
       allListing,
       q: q || '',
       category: category || '',
       minPrice: minPrice || '',
       maxPrice: maxPrice || '',
       minRating: minRating || '',
   });
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
    
    // Check if manual coordinates were provided
    if (req.body.listing.longitude && req.body.listing.latitude) {
        const longitude = parseFloat(req.body.listing.longitude);
        const latitude = parseFloat(req.body.listing.latitude);
        
        if (!isNaN(longitude) && !isNaN(latitude)) {
            newListing.geometry = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        } else {
            req.flash("error", "Invalid coordinates provided. Please enter valid latitude and longitude values.");
            return res.redirect("/listings/new");
        }
    } else {
        // Auto-generate coordinates from location using Mapbox
        try {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.listing.location,
                    limit: 1
                })
                .send();
            
            const features = response && response.body && Array.isArray(response.body.features)
                ? response.body.features
                : [];
            if (features.length === 0 || !features[0].geometry) {
                req.flash("error", "Could not determine location coordinates. Please enter a valid location or provide manual coordinates.");
                return res.redirect("/listings/new");
            }
            newListing.geometry = features[0].geometry;
        } catch (error) {
            console.error("Geocoding error:", error);
            req.flash("error", "Error determining location coordinates. Please try again or provide manual coordinates.");
            return res.redirect("/listings/new");
        }
    }
    
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
    
    const prevLocation = listing.location;
    const nextLocation = req.body.listing?.location;
    
    // Prepare update data
    let updateData = { ...req.body.listing };
    
    // If location changed, recompute geometry via Mapbox
    if (nextLocation && nextLocation !== prevLocation) {
        try {
            const geo = await geocodingClient
                .forwardGeocode({ query: nextLocation, limit: 1 })
                .send();
            const features = geo && geo.body && Array.isArray(geo.body.features) ? geo.body.features : [];
            if (features.length === 0 || !features[0].geometry) {
                req.flash("error", "Could not determine new location coordinates. Please enter a valid location.");
                return res.redirect(`/listings/${id}/edit`);
            }
            updateData.geometry = features[0].geometry;
        } catch (error) {
            console.error("Geocoding error:", error);
            req.flash("error", "Error updating location coordinates. Please try again.");
            return res.redirect(`/listings/${id}/edit`);
        }
    }
    
    // Check if manual coordinates were provided
    if (req.body.listing.longitude && req.body.listing.latitude) {
        const longitude = parseFloat(req.body.listing.longitude);
        const latitude = parseFloat(req.body.listing.latitude);
        
        if (!isNaN(longitude) && !isNaN(latitude)) {
            updateData.geometry = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        }
    }
    
    // Update the listing with all data including geometry
    listing = await Listing.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    
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
