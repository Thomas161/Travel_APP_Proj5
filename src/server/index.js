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

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "dist/index.html");
});

// fetch(`${base}q=london&username=${userName}`)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e));

const getCityDetail = async (city, user) => {
  const request = await fetch(`${base}q=${city}&username=${user}`);
  const res = await request.json();
  console.log("Response back", res);
  trip.city = res.geonames[0].name;
};

app.post("/document", async (req, res) => {
  trip = {};
  try {
    await getCityDetail(city, userName);
    res.json({
      status: "sucess",
      city: req.body.city,
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(8080, () => {
  console.log(`Listening on 8080`);
});
