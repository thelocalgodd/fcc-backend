let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

module.exports = app;

// accesss index.html file
let absolutePath = __dirname + "/views/index.html";

// middleware
app.use("/public", express.static(__dirname + "/public"));

// routes
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);

  next();
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({
      time: req.time,
    });
  }
);

app.get("/:word/echo", function (req, res) {
  res.send({
    echo: req.params.word,
  });
});

app.get("/name", function (req, res) {
  res.send({
    name: req.query.first + " " + req.query.last,
  });
});

bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", function (req, res) {
  res.send({ name: req.body.first + " " + req.body.last });
});
