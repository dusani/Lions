var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var morgan = require("morgan");

var lionRouter = require("./lions");

var app = express();

app.use(morgan("dev"));
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// now we need to mount the routes
app.use("/lions", lionRouter);

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(error);
    }
});

module.exports = app;
