const express = require("express");
const { connectDB } = require("./db/connection");
const { PORT } = require("./config/config");

const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./users/user.routes");
const discussionRoutes = require("./discussions/discussion.routes");
const commentRoutes = require("./comments/comment.routes");
const notFound = require("./middeware/not-found");
const errorHandler = require("./middeware/error-handler");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/discussions", discussionRoutes);
app.use("/comments", commentRoutes);

app.use(notFound);
app.use(errorHandler);

// connect to database and then to server

connectDB()
    .then(() => {
        console.log("######## Mongo Connected ########");

        // connect to server
        app.listen(PORT, () => {
            console.log(`######## Express connected on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
