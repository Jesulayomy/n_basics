const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/:id/comment", ensureAuth, postsController.createComment);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.put("/likeComment/:id", postsController.likeComment);

router.delete("/deletePost/:id", postsController.deletePost);

router.delete("/deleteComment/:id", postsController.deleteComment);

module.exports = router;
