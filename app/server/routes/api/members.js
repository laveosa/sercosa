const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "app/server/files/elements.json"),
    "utf8",
    (err, data) => {
      res.json(JSON.parse(data));
    }
  );
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

module.exports = router;
