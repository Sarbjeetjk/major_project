if(process.env.NODE_ENV !="production") {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utility/ExpressError.js");
const session =require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const e = require('connect-flash');

// MongoDB connection URL
const mongo_url ='mongodb://localhost:27017/wonderlust';

main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

//connect to MongoDB
async function main() {
        await mongoose.connect(mongo_url);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));


const sessionOptions = {
    secret:"mysupercode",
    resave:false,
    saveUninitialized:true
};

//home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
      res.locals.success =req.flash("success");
      res.locals.error =req.flash("error");
      res.locals.currUser = req.user;
      next();
});

// app.get("/demouser",async(req,res)=>{
//    let fakeUser =new User ({
//       email:"student@gmail.com",
//       username:"sarbjeet"
//    });

//    let registeredUser = await User.register(fakeUser,"password");
//    res.send(registeredUser);
// }
// );

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

// where undefine route ( page not found)//
app.use((err,req,res,next) =>{
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode) .send(message);
    
});

//start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


// app.get('/testListing', async(req, res) => {
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"a beautiful villa",
//         image:"",
//         price:1000,
//         location:"Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log(sampleListing);
//     console.log("sample was saved");
//     res.send('Listing created!');
// });

