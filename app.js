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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const e = require('connect-flash');
const { env } = require('process');


const dbUrl=process.env.ATLASDB_URL;

main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

//connect to MongoDB
async function main() {
        await mongoose.connect(dbUrl);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    touchAfter:24*60*60,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
});
store.on("error",()=>{
    console.log("session store error");
});
const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly:true,
    }
};


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
      // defaults for navbar search locals so EJS doesn't error on undefined
      res.locals.q = "";
      res.locals.category = "";
      res.locals.minPrice = "";
      res.locals.maxPrice = "";
      res.locals.minRating = "";
      next();
});



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




