const CommentService = require("./comment.service");

exports.createComment = async (req, res) => {
    try {
        const comment = await CommentService.createComment(
            req.body,
            req.user.id
        );
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("No comment found");

        const comment = await CommentService.updateComment(
            req.params.id,
            req.body,
            req.user.id
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("No comment found");
        await CommentService.deleteComment(req.params.id, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.likeComment = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("No comment found");
        const comment = await CommentService.likeComment(
            req.params.id,
            req.user.id
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
