if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// MongoDB Atlas connection URL
const mongo_url = process.env.ATLASDB_URL;

async function main() {
    try {
        await mongoose.connect(mongo_url);
        console.log('Connected to MongoDB');
        await initDB();
        console.log('Database initialization completed successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

const initDB = async () => {
    try {
        console.log('Starting database initialization...');
        await Listing.deleteMany({});
        console.log('Cleared existing listings');
        
        // attach owner and geocode geometry for each listing
        const enriched = await Promise.all(
            initData.data.map(async (obj) => {
                const base = { ...obj, owner: "68e2c4ecb73e47024570a9c9" };
                
                // Check if coordinates already exist in the data
                if (obj.geometry && obj.geometry.coordinates && 
                    Array.isArray(obj.geometry.coordinates) && 
                    obj.geometry.coordinates.length === 2 &&
                    obj.geometry.coordinates[0] !== 0 && obj.geometry.coordinates[1] !== 0) {
                    // Use existing coordinates from data.js
                    console.log(`Using existing coordinates for ${base.location}: [${obj.geometry.coordinates[0]}, ${obj.geometry.coordinates[1]}]`);
                    base.geometry = obj.geometry;
                } else {
                    // Only geocode if coordinates are missing or invalid
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
                            console.log(`Geocoded coordinates for ${base.location}: [${features[0].geometry.coordinates[0]}, ${features[0].geometry.coordinates[1]}]`);
                        } else {
                            // fallback to [0,0] if not found
                            base.geometry = { type: 'Point', coordinates: [0, 0] };
                            console.log(`No geocoding results for ${base.location}, using default coordinates`);
                        }
                    } catch (e) {
                        console.error("Geocoding failed for:", base.location, "-", e.message);
                        base.geometry = { type: 'Point', coordinates: [0, 0] };
                    }
                }
                return base;
            })
        );
        
        await Listing.insertMany(enriched);
        console.log(`Database initialized with ${enriched.length} listings (preserving existing coordinates)`);
        
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error;
    }
};

// Run the initialization
main().catch(console.error);
