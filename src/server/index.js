// const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
let trip = {};
const GEONAMES_BASE = process.env.API_GEONAMES_BASE_URL;
const GEONAMES_USER = process.env.API_GEONAMES_USERNAME;
const PIXABAY_BASE = process.env.API_PIXABAY_BASE_URL;
const PIXABAY_KEY = process.env.API_PIXABAY_KEY;
const WEATHER_BASE = process.env.API_WEATHERBIT_BASE_URL;
const WEATHER_KEY = process.env.API_WEATHERBIT_KEY;
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

/**FETCH REQUESTS FOR ALL 3 API'S */
//GEONAMES
// fetch(`${GEONAMES_BASE}q=london&username=${GEONAMES_USER}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));
//PIXABAY
// fetch(`${PIXABAY_BASE}?key=${PIXABAY_KEY}&q=yellow+flowers&image_type=photo`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));
//WEATHERBIT
fetch(`${WEATHER_BASE}&key=${WEATHER_KEY}&hours=120`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((e) => console.log(e));

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
