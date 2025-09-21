const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utlity/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/users.js");
//user signup
router.get("/signup",controllerUser.renderSignup);
//user signup
router.post("/signup",wrapAsync(controllerUser.userSignup));
// user login
router.get("/login",controllerUser.userLogin);
// for render login
router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login', failureFlash:true,}), controllerUser.renderLogin);

router.get("/logout",controllerUser.userLogout);


module.exports = router;