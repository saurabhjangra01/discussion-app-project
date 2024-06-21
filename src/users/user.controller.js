const UserService = require("./user.service");

exports.updateUser = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("user id not found");
        const user = await UserService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("user id not found");
        await UserService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserList = async (req, res) => {
    try {
        const users = await UserService.getUserList();
        res.status(200).json({ total_users: users.length, users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("user id not found");
        const user = await UserService.getUserDetails(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchUser = async (req, res) => {
    try {
        const users = await UserService.searchUser(req.query.name);
        res.status(200).json({ total_users: users.length, users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
