const mongoose = require("mongoose"),
      User     = require("./User");

const commentSchema = new mongoose.Schema({
    content : String,
    author  : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }
})

module.exports = mongoose.model("Comment", commentSchema);