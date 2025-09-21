const User = require("../models/user");

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.userSignup = async(req,res)=>{
    try{
        let{username, email, password} =req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
         req.flash('success',"Welcome to Wonderlust..");
        res.redirect("/listings");
    });
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.userLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.renderLogin = async(req,res)=>{
    req.flash("success","Welcome back to Wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req,res)=>{
    req.logout((err)=>{
        if(err) {
           return next(err);
        }
        req.flash("seccess","you are logged out");
        res.redirect("/listings");
    })
};