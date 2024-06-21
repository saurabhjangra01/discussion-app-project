const DiscussionService = require("./discussion.service");

exports.createDiscussion = async (req, res) => {
    try {
        const discussion = await DiscussionService.createDiscussion(
            req.body,
            req.user.id
        );
        res.status(201).json(discussion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDiscussion = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Discussion not found");

        const discussion = await DiscussionService.updateDiscussion(
            req.params.id,
            req.body,
            req.user.id
        );
        if (!discussion) throw new Error("Discussion not found");
        res.status(200).json(discussion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDiscussion = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Discussion not found");
        await DiscussionService.deleteDiscussion(req.params.id, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDiscussionsByTag = async (req, res) => {
    try {
        if (!req.query.tag) throw new Error("No tags passed");

        const discussions = await DiscussionService.getDiscussionsByTag(
            req.query.tag
        );
        res.status(200).json({
            total_discussions: discussions.length,
            discussions,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchDiscussions = async (req, res) => {
    try {
        if (!req.query.text) throw new Error("No serach text passed");

        const discussions = await DiscussionService.searchDiscussions(
            req.query.text
        );
        res.status(200).json({
            total_discussions: discussions.length,
            discussions,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.likeDiscussion = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Discussion not found");

        const discussion = await DiscussionService.likeDiscussion(
            req.params.id,
            req.user.id
        );
        res.status(200).json(discussion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.incrementViewCount = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("Discussion not found");

        const discussion = await DiscussionService.incrementViewCount(
            req.params.id
        );
        res.status(200).json(discussion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
