const express = require("express"),
      router = express.Router(),
      Campground = require("../models/Campground"),
      middleware = require("../middleware");
        

//Campground page
router.get("/", async (req, res) => {
    try{
    let campgrounds = await Campground.find();
    res.render("campgrounds/index" , {campgrounds : campgrounds})
    }
    catch(err){
        console.log(err)
    }

})

//new campground addintion page route
router.get("/new" , middleware.isLoggedIn , (req , res) => {
    res.render("campgrounds/new");
})

//post request handling of new campgorund creation
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.create(req.body.newCampground)
     .then(newCampground => {
         newCampground.author.id = req.user._id;
         newCampground.author.username = req.user.username;
         newCampground.save();
         req.flash("success", "Campground was successfully added!")
         res.redirect("/campgrounds")
        })
     .catch(console.log);
})

//campgrounds show page
router.get("/:id" , (req, res) =>{
    Campground.findById(req.params.id)
     .populate("comments")
     .exec((err , foundCampground) => {
         res.render("campgrounds/show" , {campground : foundCampground})
     })
});

//edit campground route
router.get("/:id/edit" , middleware.checkCampgroundOwnership,  (req, res) => {
    Campground.findById(req.params.id)
    .then(foundCampground => {
        res.render("campgrounds/edit" , {campground : foundCampground});
    })
    .catch(err => {
        console.log(err)
        res.redirect("/campgrounds")
    })
})

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership,  (req, res) => {
    Campground.findByIdAndUpdate(req.params.id , req.body.newCampground)
     .then(campground => {
        req.flash("success", "Camground Was Successfully Updated!") 
        res.redirect(`/campgrounds/${req.params.id}`)
    })
     .catch(err => {
         console.log(err);
         res.redirect("/campgrounds")
     })
})

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, async (req , res) => {
    try{
        let foundCampground = await Campground.findById(req.params.id);
        await foundCampground.remove();
        req.flash("success", "Campground was successfully removed!")
        res.redirect("/campgrounds")
    }catch(err){
        console.log(err);
        res.redirect("/campgrounds");
    }
})

//Exporting all the Campground Routes
module.exports = router;