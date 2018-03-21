var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var port = 3000;

var app = express();

// app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var boats = [];
var id = 0;

//ROUTES
// Get all boats
app.get("/boats", (req, res) => {
    res.json(boats);
});

// Get one or a specific boat
app.get("/boats/:id", (req, res) => {
    var boat = _.find(boats, { id: req.params.id });
    res.json(boat || {});
});

// Add a boat
app.post("/boats", (req, res) => {
    var boat = req.body;
    id++;
    boat.id = id + "";

    boats.push(boat);

    res.json(boat);
});

// Update a boat
app.put("/boat/:id", (req, res) => {
    var update = req.body;
    if (update.id) {
        delete update.id;
    }

    var boat = _.findIndex(boats, { id: req.params.id });
    if (!boats[boat]) {
        res.send();
    } else {
        var updatedBoat = _.assign(boats[boat], update);
        res.json(updatedBoat);
    }
});

// Delete a boat
app.delete("/boat/:id", (req, res) => {
    var boat = _.findIndex(boats, { id: req.params.id });
    if (boats[boat]) {
        res.send();
    } else {
        var deletedBoat = boats[boat];
        boats.splice(boat, 1);
        res.json(deletedBoat);
    }
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
