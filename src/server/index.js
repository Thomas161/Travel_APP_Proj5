const place = require("../client/js/api/geonamesAPI");
const weather = require("../client/js/api/weatherbitAPI");
const pix = require("../client/js/api/pixabayAPI");
const covid = require("../client/js/api/covid19API");

process.binding(
  "http_parser"
).HTTPParser = require("http-parser-js").HTTPParser;
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_USER = process.env.API_GEONAMES_USERNAME;
const PIXABAY_KEY = process.env.API_PIXABAY_KEY;
const WEATHER_KEY = process.env.API_WEATHERBIT_KEY;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.get("/test", (req, res) => {
  res.json({
    status: 200,
  });
});

app.listen(8080, () => {
  console.log(`Listening on 8080`);
});

app.post("/tripInfo", async (req, res) => {
  try {
    const city = req.body.city;
    const date = req.body.date;
    console.log("City in endpoint", city);
    let location = place.getCityDetail(GEONAMES_USER, city);
    let trip = await location;
    let mother = weather.getWeatherDetail(city, date, WEATHER_KEY);
    let trip2 = await mother;
    let im = pix.getImageDetail(city, PIXABAY_KEY);
    let trip3 = await im;
    let disease = covid.getCovidData();
    let covid19 = await disease;

    res.json({
      trip: trip,
      trip2: trip2,
      trip3: trip3,
      covid19: covid19,
      errorMessage: new Error("Something went wrong"),
    });
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = app;
