// const path = require("path");
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
const { urlencoded } = require("body-parser");
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

//send request to geoname server
const getCityDetail = async (key, city) => {
  console.log("defined city", city);
  try {
    const request = await fetch(
      `    http://api.geonames.org/searchJSON?username=${key}&name=${city}&maxRows=2`
    );
    console.log("Request from fetched api =>", request);

    const res = await request.json();
    console.log("Response back from geonames", res);
    let trip = {};
    trip.city = city;
    trip.country = res.geonames[0].countryName;
    trip.population = res.geonames[0].lng;
    trip.longitude = res.geonames[0].lng;
    trip.latitude = res.geonames[0].lat;
  } catch (err) {
    console.log("Errors fetching geonames api", err);
  }

  return trip;
};

const getWeatherDetail = async (city, date, key) => {
  try {
    const request = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`
    );
    console.log("request", request);
    const res = await request.json();
    console.log("Response back requesting info from weatherbit", res);
    let trip = {};
    trip.temp = res.data.filter((t) => t.valid_date == date)[0].temp;
    trip.description = res.data.filter(
      (d) => d.valid_date == date
    )[0].weather.description;
    trip.icon = res.data.filter((i) => i.valid_date == date)[0].weather.icon;
  } catch (err) {
    console.log("Errors fetching weatherbit api", err);
  }
  return trip;
};
const getImageDetail = async (city, key) => {
  try {
    const request = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${city}&category=travel`
    );
    console.log("request", request);
    const res = await request.json();
    console.log("Response back requesting info from geonames", res);
    let trip = {};
    trip.photo = res.hits[0].previewURL;
  } catch (err) {
    console.log("Errors fetching pixabay api", err);
  }

  return trip;
};

app.post("/tripInfo", async (req, res) => {
  try {
    const city = req.body.city;
    const date = req.body.date;
    console.log("City in endpoint", city);
    let trip = await getCityDetail(GEONAMES_USER, city);
    let trip2 = await getWeatherDetail(city, date, WEATHER_KEY);
    let trip3 = await getImageDetail(city, PIXABAY_KEY);
    //message: 'success' is coming back to front end in console
    res.json({
      trip: trip,
      trip2: trip2,
      trip3: trip3,
    });
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = app;
