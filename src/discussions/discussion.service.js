const Discussion = require("./discussion.model");

exports.createDiscussion = async (discussionData, userId) => {
    const discussion = new Discussion({ ...discussionData, user_id: userId });
    await discussion.save();
    return discussion;
};

exports.updateDiscussion = async (discussionId, discussionData, userId) => {
    const discussion = await Discussion.findOneAndUpdate(
        { _id: discussionId, user_id: userId },
        discussionData,
        { new: true }
    );
    return discussion;
};

exports.deleteDiscussion = async (discussionId, userId) => {
    await Discussion.findOneAndDelete({ _id: discussionId, user_id: userId });
};

exports.getDiscussionsByTag = async (tags) => {
    if (tags) {
        tags = tags.split(",");
    }
    return Discussion.find({ hashtags: { $all: tags } });
};

exports.searchDiscussions = async (text) => {
    return Discussion.find({ text: new RegExp(text, "i") });
};

exports.likeDiscussion = async (discussionId, userId) => {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) throw new Error("Discussion not found");

    const userIndex = discussion.likes.indexOf(userId);
    if (userIndex === -1) {
        discussion.likes.push(userId);
    } else {
        discussion.likes.splice(userIndex, 1);
    }
    await discussion.save();
    return discussion;
};

exports.incrementViewCount = async (discussionId) => {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) throw new Error("Discussion not found");

    discussion.view_count += 1;
    await discussion.save();
    return discussion;
};
