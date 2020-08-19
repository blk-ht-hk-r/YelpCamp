const middlewareObject = require("../middleware");

const express = require("express"),
      router  = express.Router({mergeParams : true}),
      Campground = require("../models/Campground"),
      Comment   = require("../models/Comment"),
      middleware = require("../middleware");


//new comment addition show page route
router.get("/new" , middleware.isLoggedIn,  (req , res) => {
    Campground.findById(req.params.id)
    .then(foundCampground => res.render("comments/new" , {campground : foundCampground}))
    .catch(console.log)
})

//new comment post route
router.post("/" , middleware.isLoggedIn, (req , res) => {
    Comment.create(req.body.comment)
     .then(newComment => {
         newComment.author.id = req.user._id;
         newComment.author.username = req.user.username;
         newComment.save();

         Campground.findById(req.params.id)
          .then(foundCampground => {
              foundCampground.comments.push(newComment);
              foundCampground.save();
              req.flash("success", "Your Comment was added Successfully!")
              res.redirect(`/campgrounds/${req.params.id}`);
          })
     })
     .catch(console.log)
})

//Edit Comment form route
router.get("/:comment_id/edit", middleware.checkCommentOwnership , async (req, res) => {
    try{
        let foundComment = await Comment.findById(req.params.comment_id)
        res.render("comments/edit", {campground_id : req.params.id , comment : foundComment})
    }catch(err){
        console.log(err)
        res.redirect("/campgrounds")
    }
})

//Comment Upgrade route
router.put("/:comment_id", middleware.checkCommentOwnership,  async (req, res) =>{
    try{
        await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
        req.flash("success", "Your Comment was Updated Successfully!")
        res.redirect(`/campgrounds/${req.params.id}`);
    }catch(err){
        console.log(err)
    }
})

//Destroy Comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
    try{
        await Comment.findByIdAndRemove(req.params.comment_id)
        req.flash("success", "Your Comment was removed Successfully!")
        res.redirect(`/campgrounds/${req.params.id}`)
    }catch(err){
        console.log(err)
        res.redirect("/campgrounds")
    }
})

//Exporting all the Comments Routes
module.exports = router;