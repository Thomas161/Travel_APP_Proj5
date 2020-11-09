// const path = require("path");
process.binding(
  "http_parser"
).HTTPParser = require("http-parser-js").HTTPParser;
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_BASE = process.env.API_GEONAMES_BASE;
const GEONAMES_USER = process.env.API_GEONAMES_USERNAME;
const PIXABAY_BASE = process.env.API_PIXABAY_BASE;
const PIXABAY_KEY = process.env.API_PIXABAY_KEY;
const WEATHER_BASE = process.env.API_WEATHERBIT_BASE;
const WEATHER_KEY = process.env.API_WEATHERBIT_KEY;
const express = require("express");
const app = express();
// let trip = {};

const bodyParser = require("body-parser");
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

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
// fetch(`${WEATHER_BASE}&key=${WEATHER_KEY}&hours=120`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));

app.listen(8080, () => {
  console.log(`Listening on 8080`);
});

//send request to geoname server
const getCityDetail = async (city, user) => {
  const request = await fetch(`${GEONAMES_BASE}q=${city}&username=${user}`);
  console.log("request", request);
  const res = await request.json();
  console.log("Response back requesting info from geonames", res);
  let trip = {};
  trip.city = res.geonames[0].name;
  trip.population = res.geonames[0].population;
  trip.long = res.geonames[0].lng;
  return trip;
};
app.post("/tripInfo", async (req, res) => {
  //empty out trip
  // trip = {};

  try {
    const city = req.body.city;

    let trip = await getCityDetail(city, GEONAMES_USER);
    //message: 'success' is coming back to front end in console
    res.json({
      trip: trip,
      message: "success",
    });
  } catch (err) {
    console.log("error", err);
  }
});

// app.get("/retrieve", (req, res) => {
//   res.status(200).send(JSON.parse(JSON.stringify(trip)));
// });
// app.post("/sent", (req, res) => {
//   // let data = req.body;
//   console.log("Request", req);
//   trip = {
//     city: req.body.city,
//   };
//   res.status(200).send(JSON.parse(JSON.stringify(trip)));
// });
