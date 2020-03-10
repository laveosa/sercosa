const ejs = require("ejs");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const fs = require("fs");
const bodyParser = require("body-parser");
const routUser = require("./app/server/routes/api/members");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// add view engine
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

// add static files
app.use(express.static(path.join(__dirname, "app")));

// add body parser: standart exemple
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add body parser: extra exemple
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// add all routes
app.use("/api/users", routUser);

app.get("/", (req, res) => {
  const _path = path.join(__dirname, "app/server/views/index.ejs");
  const _model = {
    title: "Main page"
  };

  res.render(_path, _model);
});

app.listen(PORT, () => {});
