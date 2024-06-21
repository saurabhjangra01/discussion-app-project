const express = require("express");
const router = express.Router();
const CommentController = require("./comment.controller");
const auth = require("./../middeware/auth");
const { validate, commentValidator } = require("./../utils/validator");

router.post(
    "/",
    validate(commentValidator),
    auth,
    CommentController.createComment
);
router.put(
    "/:id",
    validate(commentValidator),
    auth,
    CommentController.updateComment
);
router.delete("/:id", auth, CommentController.deleteComment);
router.post("/:id/like", auth, CommentController.likeComment);

module.exports = router;
