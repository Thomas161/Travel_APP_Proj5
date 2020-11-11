/**Global Variables */
import { clearInput } from "./cleanInputField";

const fetch = require("node-fetch");
let d = document.getElementById("demo");
let d2 = document.getElementById("demo2");
let d3 = document.getElementById("demo3");
let d4 = document.getElementById("demo4");
let d5 = document.getElementById("demo5");
let d6 = document.getElementById("demo6");
let d7 = document.getElementById("demo7");
/**Helper functions */
// async post data to server
const postData = async (url = "", data = {}) => {
  let res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newIncomingData = await res.json();
    console.log("Incoming data =>", newIncomingData.trip);
    return newIncomingData;
  } catch (err) {
    console.log("Error here", err);
  }
};
export const formSubmit = async (e) => {
  e.preventDefault();

  let city = document.getElementById("city").value;
  console.log("city", city);

  //data to send back to server
  const data = {
    city: city,
  };
  const journey = await postData("http://localhost:8080/tripInfo", data);
  console.log("Response coming back", journey);

  d.innerHTML = journey.trip.city;
  d2.innerHTML = journey.trip.country;
  d3.innerHTML = journey.trip.population;
  d4.innerHTML =
    "Latitude:" + journey.trip.latitude + "Longitude:" + journey.trip.longitude;
  d5.innerHTML = journey.trip2.temp;
  d6.innerHTML = journey.trip2.description;
  d7.innerHTML = `<img alt="forecast_icon" src="https://www.weatherbit.io/static/img/icons/${journey.trip2.icon}.png"/>  `;

  // updateHTML(journey);
  clearInput();
};
