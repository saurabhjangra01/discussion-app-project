const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.signup = async ({ name, email, password, mobile }) => {
    const user = new User({ name, email, password, mobile });
    await user.save();
    return user;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
