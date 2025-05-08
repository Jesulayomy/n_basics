const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


commentSchema.methods.timePassed = function (date) {
  const now = new Date();
  const diffInSeconds = Math.floor(Math.abs(now - date) / 1000);

  if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 604800) { 
      return `${Math.floor(diffInSeconds / 86400)} d`;
  } else {
      return `${Math.floor(diffInSeconds / 604800)} w`;
  }
}


module.exports = mongoose.model("Comment", commentSchema);
