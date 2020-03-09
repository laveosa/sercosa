const ejs = require("ejs");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");
const bodyParser = require("body-parser");
const routUser = require("./app/server/routes/api/members");

const server = express();
const PORT = process.env.PORT || 3000;

server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "app")));

// standart exemple
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// extra exemple
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());

server.use("/api/users", routUser);

server.get("/", (req, res) => {
  const _path = path.join(__dirname, "app/server/views/index.ejs");
  const _model = {
    title: "Main page"
  };

  res.render(_path, _model);
});

server.listen(PORT, () => {});
