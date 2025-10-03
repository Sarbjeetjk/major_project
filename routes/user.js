const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utility/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/users.js");

router
 .route("/signup")
  //user signup
 .get(controllerUser.renderSignup)
  //user signup
 .post(wrapAsync(controllerUser.userSignup));

router
 .route("/login")
  // user login
 .get(controllerUser.userLogin)
  // for render login
 .post(saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login', failureFlash:true,}), controllerUser.renderLogin);

router.get("/logout",controllerUser.userLogout);

module.exports = router;