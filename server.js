var express = require("express");
var app = express();
const PORT = 3000;

var jsonData = {
  count: 12,
  message: "hey"
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html", err => {
    if (err) {
      res.status(300).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
