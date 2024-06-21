const Comment = require("./comment.model");

exports.createComment = async ({ text, discussion_id }, userId) => {
    const comment = new Comment({ text, discussion_id, user_id: userId });
    await comment.save();
    return comment;
};

exports.updateComment = async (commentId, { text, discussion_id }, userId) => {
    const comment = await Comment.findOneAndUpdate(
        {
            _id: commentId,
            discussion_id: discussion_id,
            user_id: userId,
        },
        { text },
        { new: true }
    );
    return comment;
};

exports.deleteComment = async (commentId, userId) => {
    await Comment.findOneAndDelete({ _id: commentId, user_id: userId });
};

exports.likeComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");

    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
        comment.likes.push(userId);
    } else {
        comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return comment;
};
