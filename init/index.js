const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// MongoDB connection URL
const mongo_url ='mongodb://localhost:27017/wonderlust';
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
    try{
        await main();
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Database initialized with sample data");
} catch (err) {
        console.error("Error initializing database", err);
    } finally {
        mongoose.connection.close();
    }
};
   
initDB();
