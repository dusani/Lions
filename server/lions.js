var lionRouter = require("express").Router();
const Lion = require("../models/lions");

// var lions = [];
// var id = 0;

// var updatedId = function(req, res, next) {
//     if (!req.body.id) {
//         id++;
//         req.body.id = id + "";
//     }
//     next();
// };

// lionRouter.param("id", function(req, res, next, id) {
//     var lion = _.find(lions, { id: id });

//     if (lion) {
//         req.lion = lion;
//         next();
//     } else {
//         res.send();
//     }
// });

// routes
lionRouter.get("/", (req, res) => {
  Lion.find((err, lion) => {
    if (err) {
      res.send(err);
    }

    // mongoose sends info back in json format
    res.send(lion);
  });
});

lionRouter.get("/:id", (req, res) => {
  // var lion = req.lion;
  // res.json(lion || {});
  Lion.findById(req.params.id, (err, lion) => {
    if (err) {
      res.send(err);
    }
    res.send(lion);
  });
});

lionRouter.post("/", (req, res) => {
  // var lion = req.body;
  // lions.push(lion);
  // res.json(lion);

  // receive the json Lion object
  const lionObj = new Lion({
    name: req.body.name,
    age: req.body.age,
    pride: req.body.pride,
    gender: req.body.gender
  });

  lionObj.save(err => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "Lion Created" });
  });
});

lionRouter.put("/:id", (req, res) => {
  // var update = req.body;
  // if (update.id) {
  //     delete update.id;
  // }
  //
  // var lion = _.findIndex(lions, { id: req.params.id });
  // if (!lions[lion]) {
  //     res.send();
  // } else {
  //     var updatedLion = _.assign(lions[lion], update);
  //     res.json(updatedLion);
  // }
  Lion.findById(req.params.id, (err, lion) => {
    if (err) {
      res.send(err);
    }
    if (req.body.name) {
      lion.name = req.body.name;
    }
    if (req.body.age) {
      lion.age = req.body.age;
    }
    if (req.body.pride) {
      lion.pride = req.body.pride;
    }
    if (req.body.gender) {
      lion.gender = req.body.gender;
    }

    lion.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: "Update the lion" });
    });
  });
});

lionRouter.delete("/:id", (req, res) => {
  // var lion = _.findIndex(lions, { id: req.params.id });
  // if (!lions[lion]) {
  //     res.send();
  // } else {
  //     var deletedLion = lions[lion];
  //     lions.splice(lion, 1);
  //     res.json(deletedLion);
  // }
  Lion.remove({ _id: req.params.id }, (err, lion) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Deleted the lion" });
  });
});

module.exports = lionRouter;
