const express = require("express"),
      router  = express.Router(),
      User = require("../models/User"),
      passport = require("passport");

//Landing page
router.get("/", (req, res) => {
    res.render("home")
})

//Showing the registration page
router.get("/register" ,(req , res) => {
    res.render("register");
})

//getting the request for the sign up of a new user
router.post("/register", (req , res) => {
    User.register(new User({username : req.body.username}) , req.body.password)
     .then(createdUser => {
         passport.authenticate("local")(req ,res , () => {
             req.flash("success", `Welcome to YelpCamp ${createdUser.username}`)
             res.redirect("/campgrounds")
         })
     })
     .catch(err => {
         console.log(err);
         req.flash("error", err.message)
         res.redirect("/register");
     })
})

//Showing the login page
router.get("/login" , (req , res) => {
    res.render("login")
})

//getting the user request fot login
router.post("/login", passport.authenticate("local",
    {
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    })
);

//route for the logout
router.get("/logout" , (req, res) => {
    req.flash("success", `Bye ${req.user.username}`)
    req.logout();
    res.redirect("/campgrounds");
})

//Exporting the Landing page and Auth Routes
module.exports = router;