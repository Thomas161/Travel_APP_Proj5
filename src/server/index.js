const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const base = process.env.API_GEONAMES_BASE_URL;
const userName = process.env.API_GEONAMES_USERNAME;
let trip = {};

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "dist/index.html");
});
app.listen(8080, () => {
  console.log(`Listening on 8080`);
});
const getCityDetail = async (city, user) => {
  const request = await fetch(`${base}q=${city}&username=${user}`);
  const res = await request.json();

  trip.city = res.geonames[0].name;
};

app.post("/document", async (req, res) => {
  trip = {};
  try {
    const city = req.body.city;
    await getCityDetail(city, userName);
    res.json();
  } catch (error) {
    res.send(status);
  }
});
