const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        discussion_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Discussion",
            required: true,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
