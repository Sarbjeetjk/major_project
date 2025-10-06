if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
};

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// MongoDB connection URL
const mongo_url ='mongodb://localhost:27017/m_p_cursor';
main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

async function main() {
        await mongoose.connect(mongo_url);
}

const initDB = async () => {
        await Listing.deleteMany({});
        // attach owner and geocode geometry for each listing
        const enriched = await Promise.all(
            initData.data.map(async (obj) => {
                const base = { ...obj, owner: "68e275ae4af8076c71e2b514" };
                try {
                        const mapToken = process.env.MAP_TOKEN;
                        if(!mapToken) {
                                throw new Error("Missing MAP_TOKEN env var");
                        }
                        const geocodingClient = mbxGeocoding({ accessToken: mapToken });
                        const resp = await geocodingClient
                                .forwardGeocode({ query: base.location, limit: 1 })
                                .send();
                        const features = resp && resp.body && Array.isArray(resp.body.features) ? resp.body.features : [];
                        if (features.length > 0 && features[0].geometry) {
                                base.geometry = features[0].geometry; // GeoJSON { type, coordinates:[lng,lat] }
                        } else {
                                // fallback to [0,0] if not found
                                base.geometry = { type: 'Point', coordinates: [0, 0] };
                        }
                } catch (e) {
                        console.error("Geocoding failed for:", base.location, "-", e.message);
                        base.geometry = { type: 'Point', coordinates: [0, 0] };
                }
                return base;
            })
        );
        await Listing.insertMany(enriched);
        console.log("Database initialized with sample data (geocoded)");

};
 
// const initDB = async () => {
//     try{
//         await main();
//         await Listing.deleteMany({});
//         await Listing.deleteMany({});
//         initData.data = initData.data.map((obj) =>({...obj, owner:"68cd7a7f7fbeba6bf5b670b6",}));
//         await Listing.insertMany(initData.data);
//         console.log("Database initialized with sample data");
// } catch (err) {
//         console.error("Error initializing database", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };
   
initDB();
