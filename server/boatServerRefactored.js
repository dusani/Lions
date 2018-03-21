var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var morgan = require("morgan");

var app = express();

var boats = [];
var id = 0;

var updatedId = function(req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + "";
    }
    next();
};

app.use(morgan("dev"));
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(error);
    }
});

app.param("id", function(req, res, next, id) {
    var boat = _.find(boats, { id: id });

    if (boat) {
        req.boat = boat;
        next();
    } else {
        res.send();
    }
});

// routes
app.get("/boats", (req, res) => {
    res.json(boats);
});

app.get("/boats/:id", (req, res) => {
    var boat = req.boat;
    res.json(boat || {});
});

app.post("/boats", updatedId, (req, res) => {
    var boat = req.body;
    boats.push(boat);
    res.json(boat);
});

app.put("/boats/:id", (req, res) => {
    var update = req.body;
    if (update.id) {
        delete update.id;
    }

    var boat = _.findIndex(boats, { id: req.params.id });
    if (!boats[boat]) {
        res.send();
    } else {
        var updatedboat = _.assign(boats[boat], update);
        res.json(updatedboat);
    }
});

app.delete("/boats/:id", (req, res) => {
    var boat = _.findIndex(boats, { id: req.params.id });
    if (!boats[boat]) {
        res.send();
    } else {
        var deletedboat = boats[boat];
        boats.splice(boat, 1);
        res.json(deletedboat);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
