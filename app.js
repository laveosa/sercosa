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

server.get("/", (req, res) => {
  const _path = path.join(__dirname, "app/server/views/index.ejs");
  const _model = {
    title: "Main page"
  };

  res.render(_path, _model);
});

server.get("/api/users", (req, res) => {
  fs.readFile(
    path.join(__dirname, "app/server/files/elements.json"),
    "utf8",
    (err, data) => {
      res.json(JSON.parse(data));
    }
  );
});

server.get("/api/user?:id", async (req, res) => {
  fs.readFile(
    path.join(__dirname, "app/server/files/elements.json"),
    "utf8",
    (err, data) => {
      data = JSON.parse(data);

      if (req.params.id) {
        let userId = req.params.id.split(":")[1];
        data = data.find(user => user.id === userId);
      }

      console.log(data);

      res.json(data);
    }
  );
});

function myMidleware(req, res, next) {
  next();
}

server.listen(PORT, () => {
  //   console.log("server is runing...");
});
