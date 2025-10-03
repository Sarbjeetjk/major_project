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
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) =>({...obj, owner:"68de54946c4252ccc8ee73af",}));
        await Listing.insertMany(initData.data);
        console.log("Database initialized with sample data");

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
