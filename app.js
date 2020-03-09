const ejs = require("ejs");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");
const routes = require("./app/server/routes/api/members");

const server = express();
const PORT = process.env.PORT || 3000;

server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "app")));
server.use("/api/users", routes);

server.get("/", (req, res) => {
  const _path = path.join(__dirname, "app/server/views/index.ejs");
  const _model = {
    title: "Main page"
  };

  res.render(_path, _model);
});

server.listen(PORT, () => {});
