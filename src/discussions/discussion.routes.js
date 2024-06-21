const express = require("express");
const router = express.Router();
const DiscussionController = require("./discussion.controller");
const auth = require("./../middeware/auth");
const { validate, discussionValidator } = require("./../utils/validator");

router.post(
    "/",
    validate(discussionValidator),
    auth,
    DiscussionController.createDiscussion
);
router.put(
    "/:id",
    validate(discussionValidator),
    auth,
    DiscussionController.updateDiscussion
);
router.delete("/:id", auth, DiscussionController.deleteDiscussion);
router.get("/tags", auth, DiscussionController.getDiscussionsByTag);
router.get("/search", auth, DiscussionController.searchDiscussions);
router.post("/:id/like", auth, DiscussionController.likeDiscussion);
router.post("/:id/view", DiscussionController.incrementViewCount);

module.exports = router;
