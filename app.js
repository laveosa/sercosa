const ejs = require("ejs");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");

const server = express();
const PORT = process.env.PORT || 3000;

server.set("view engine", "ejs");
server.use(express.static("./app/client/"));
server.use(myMidleware);

// get all users
server.get("/", (req, res) => {
  const _path = path.join(__dirname, "app/server/views/index.ejs");
  const _model = {
    title: "Main page"
  };

  res.render(_path, _model);
});

// get single user
server.get("/api/users", (req, res) => {
  fs.readFile(
    path.join(__dirname, "app/server/files/elements.json"),
    "utf8",
    (err, data) => {
      res.json(JSON.parse(data));
    }
  );
});

server.get("/api/user/:id", (req, res) => {
  fs.readFile(
    path.join(__dirname, "app/server/files/elements.json"),
    "utf8",
    (err, data) => {
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
    }
  );
});

function myMidleware(req, res, next) {
  next();
}

server.listen(PORT, () => {
  //   console.log("server is runing...");
});
