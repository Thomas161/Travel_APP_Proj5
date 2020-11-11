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
const { urlencoded } = require("body-parser");
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
const getCityDetail = async (city, key) => {
  // http://api.geonames.org/search?username=tommy161&type=json&name=Vienna&maxRows=1 => works
  // const request = await fetch(`${base}${key}&type=json&name=${city}`);
  console.log("Undefined city", city);
  const request = await fetch(
    `http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${key}`
  );
  console.log(
    `http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=tommy161`
  );
  // `http://api.geonames.org/search?username=${key}&type=json&name=${city}&maxRows=1`
  // `http://api.geonames.org/search?q=${city}&fuzzy=0.8&username=${key}`
  // console.log("request", request);
  const res = await request.json();
  console.log("Response back requesting info from geonames", res);
  let trip = {};
  trip.city = res.geonames[0];
  // trip.country = res.geonames[0].countryName;
  // trip.long = res.geonames[0].lng;
  // trip.lat = res.geonames[0].lat;
  // trip.population = res.geonames[0].population;
  return trip;
};

// const getWeatherDetail = async (url, cityId, user) => {
//   // 'https://api.weatherbit.io/v2.0/forecast/hourly?city=Dallas&country=US&key=1209f1f5b1fc42ee904201358a838990&hours=48'
//   const request = await fetch(`${url}${cityId}&Key=${user}&hours=96`);
//   console.log("request", request);
//   const res = await request.json();
//   console.log("Response back requesting info from geonames", res);
//   let trip = {};
//   trip.temp = res.data[0].temp;
//   trip.wind = res.data[0].wind_gust_spd;
//   trip.description = res.data[0].weather.description;
//   return trip;
// };
app.post("/tripInfo", async (req, res) => {
  //empty out trip
  // trip = {};

  try {
    const city = req.body.city;
    console.log("City in endpoint", city);
    let trip = await getCityDetail(city, GEONAMES_USER);
    // let trip2 = await getWeatherDetail(WEATHER_BASE, trip.cityId, WEATHER_KEY);
    //message: 'success' is coming back to front end in console
    res.json({
      trip: trip,
      // trip2: trip2,
      // message: "success",
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
