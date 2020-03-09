const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const validation = {
  isText: function(cont) {
    if (!cont || cont.length <= 0) {
      return false;
    }

    return true;
  },
  isEmail: function(cont) {
    if (!cont || cont.length <= 0) {
      return false;
    }

    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());

    return true;
  }
};

router.get("/", (req, res) => {
  fs.readFile("app/server/files/elements.json", "utf8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  fs.readFile("app/server/files/elements.json", "utf8", (err, data) => {
    data = JSON.parse(data);

    let lastUserID = data[data.length - 1].id;

    if (req.params.id <= lastUserID) {
      data = data.find(user => user.id === req.params.id);
      res.json(data);
    } else {
      res.json({
        message: "There is no such user ID"
      });
    }
  });
});

router.post("/", (req, res) => {
  if (!validation.isText(req.body.name)) {
    return res.status(400).json({ message: "please enter correct name" });
  }

  let newUser = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    position: req.body.position
  };

  fs.readFile("app/server/files/elements.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    data.push(newUser);
    data = JSON.stringify(data);

    fs.writeFile("app/server/files/elements.json", data, err => {
      res.json(JSON.parse(data));
    });
  });
});

module.exports = router;
