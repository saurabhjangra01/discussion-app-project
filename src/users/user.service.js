const User = require("./user.model");
const bcrypt = require("bcryptjs");

exports.updateUser = async (userId, userData) => {
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    return user;
};

exports.deleteUser = async (userId) => {
    await User.findByIdAndDelete(userId);
};

exports.getUserList = async () => {
    return await User.find({});
};

exports.getUserDetails = async (userId) => {
    return await User.findById(userId);
};

exports.searchUser = async (name) => {
    return await User.find({ name: new RegExp(name, "i") });
};
