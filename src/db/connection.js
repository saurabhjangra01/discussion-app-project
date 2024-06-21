const { connect } = require("mongoose");
const { MONGO_URI } = require("../config/config");

async function connectDB() {
    try {
        await connect(MONGO_URI);
    } catch (error) {
        console.log(error);
        throw new Error("error connecting with database");
    }
}

module.exports = { connectDB };
