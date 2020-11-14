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
// const PORT = 8080;

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
if (process.env.NODE_ENV !== "test") {
  app.listen(8080);
}

app.listen(3000, () => {
  console.log(`Listening on 8080`);
});

// let newCity = {};
//send request to geoname server
const getCityDetail = async (key, city) => {
  console.log("defined city", city);
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

  return trip;
};

const getWeatherDetail = async (city, key) => {
  const request = await fetch(
    `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}`
  );
  console.log("request", request);
  const res = await request.json();
  console.log("Response back requesting info from geonames", res);
  let trip = {};
  trip.temp = res.data[0].temp;
  trip.description = res.data[0].weather.description;
  trip.icon = res.data[0].weather.icon;
  return trip;
};
const getImageDetail = async (city, key) => {
  const request = await fetch(
    `https://pixabay.com/api/?key=${key}&q=${city}&category=travel`
  );
  console.log("request", request);
  const res = await request.json();
  console.log("Response back requesting info from geonames", res);
  let trip = {};
  trip.photo = res.hits[0].previewURL;

  return trip;
};

app.post("/tripInfo", async (req, res) => {
  //empty out trip
  // trip = {};

  try {
    const city = req.body.city;
    console.log("City in endpoint", city);
    let trip = await getCityDetail(GEONAMES_USER, city);
    let trip2 = await getWeatherDetail(city, WEATHER_KEY);
    let trip3 = await getImageDetail(city, PIXABAY_KEY);
    //message: 'success' is coming back to front end in console
    res.json({
      trip: trip,
      trip2: trip2,
      trip3: trip3,
      // message: "success",
    });
  } catch (err) {
    console.log("error", err);
  }
});

module.exports = app;
