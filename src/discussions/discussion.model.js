const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        image_url: { type: String },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        view_count: { type: Number, default: 0 },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        hashtags: [{ type: String }],
    },
    { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = Discussion;
