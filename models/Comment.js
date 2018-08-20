var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    user: String,
    body: {
        type:String,
        required: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;