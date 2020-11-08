const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const api = process.env.API_GEONAMES_BASE_URL;
const user = process.env.API_GEONAMES_USERNAME;

fetch(`${api}${user}`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((e) => console.log("Errors found ", e));

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

// app.post("/document", async (req, res) => {
//   const resp = await fetch(`${URL}${API_Key}&lang=en&url=${req.body}`);
//   try {
//     const data = await resp.json();
//     console.log(data);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(8080, () => {
  console.log(`Listening on 8080`);
});
