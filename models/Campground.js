const mongoose = require("mongoose"),
      Comment  = require("./Comment");

const campgroundSchema = new mongoose.Schema({
    title : String,
    image : String,
    price : String,
    body : String,
    author : { id : {type : mongoose.Schema.Types.ObjectId, ref  : "User"} , username : String},
    comments : [{ type : mongoose.Schema.Types.ObjectId , ref : "Comment" }]
})

campgroundSchema.pre("remove", async function(){
    await Comment.deleteMany({
        _id : {
            $in : this.comments
        }
    });
});

module.exports = mongoose.model("Campground" , campgroundSchema);