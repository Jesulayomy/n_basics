const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ postId: req.params.id });
      res.render("post.ejs", { post: post, user: req.user, comments });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id
      });
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        text: req.body.comment,
        postedBy: req.user.id,
        postId: req.params.id
      });
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 }
        }
      );
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById({ _id: req.params.id });
      if (post) {
        await cloudinary.uploader.destroy(post.cloudinaryId);
        await Post.findByIdAndDelete({ _id: req.params.id });
      }
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      res.redirect("/profile");
    }
  }
};
