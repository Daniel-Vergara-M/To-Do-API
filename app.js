const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const languageRoutes = require("./api/routes/language");
const configRoutes = require("./api/routes/config");
const setLocals = require("./methods");

mongoose.connect(process.env.mongoURI);
setLocals(app);

app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/language", languageRoutes);
app.use("/config", configRoutes);

module.exports = app;
