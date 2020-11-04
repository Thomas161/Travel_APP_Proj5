const dotenv = require("dotenv");
dotenv.config();

// console.log("API Key", process.env.API_KEY);
// console.log("PORT", process.env.PORT);

// const API_Key = process.env.API_KEY;
const path = require("path");
const fetch = require("node-fetch");
const express = require("express");
const app = express();

// const URL = "https://api.meaningcloud.com/sentiment-2.1?key=";

const bodyParser = require("body-parser");
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.get("/test", (req, res) => {
  res.send(mockAPIResponse);
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
