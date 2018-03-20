var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");

var app = express();

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var lions = [];
var id = 0;

// routes
app.get("/lions", (req, res) => {
  res.json(lions);
});

app.get("/lions/:id", (req, res) => {
  var lion = _.find(lions, { id: req.params.id });
  res.json(lion || {});
});

app.post("/lions", (req, res) => {
  var lion = req.body;
  id++;
  lion.id = id + "";

  lions.push(lion);

  res.json(lion);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
