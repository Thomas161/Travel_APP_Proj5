// const path = require("path");
// const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

let trip = {};

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

// fetch(`${base}q=london&username=${userName}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));

app.listen(8080, () => {
  console.log(`Listening on 8080`);
});

app.get("/retrieve", (req, res) => {
  res.status(200).send(JSON.parse(JSON.stringify(trip)));
});
app.post("/sent", (req, res) => {
  // let data = req.body;
  console.log("Request", req);
  trip = {
    city: req.body.city,
  };
  res.status(200).send(JSON.parse(JSON.stringify(trip)));
});
