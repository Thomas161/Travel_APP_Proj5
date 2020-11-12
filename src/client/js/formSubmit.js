import { clearInput } from "./cleanInputField";

/**Global Variables */

const fetch = require("node-fetch");
let d = document.getElementById("demo");
let d2 = document.getElementById("demo2");
let d3 = document.getElementById("demo3");
let d4 = document.getElementById("demo4");
let d5 = document.getElementById("demo5");
let d6 = document.getElementById("demo6");
let d7 = document.getElementById("demo7");
let d8 = document.getElementById("demo8");
let d9 = document.getElementById("demo9");
let containerButton = document.getElementById("containerCard");

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
  let date = document.getElementById("depart_date").value;
  let nowDate = new Date();
  // let diffTime = Math.abs(date - nowDate);
  // let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log("city", city);
  console.log("date departure", date);
  console.log("Todays date", nowDate.getFullYear());
  // console.log(diffDays + " days");

  //data to send back to server
  const data = {
    city: city,
  };
  const journey = await postData("http://localhost:8080/tripInfo", data);
  console.log("Response coming back", journey);

  d.innerHTML = journey.trip.city;
  d2.innerHTML = journey.trip.country;
  d3.innerHTML = journey.trip.population;
  d4.innerHTML = "Latitude: " + journey.trip.latitude;
  d5.innerHTML = "Longitude: " + journey.trip.longitude;
  d6.innerHTML = journey.trip2.temp + "&deg;C";
  d7.innerHTML = journey.trip2.description;
  d8.innerHTML = `<img alt="forecast_icon" src="https://www.weatherbit.io/static/img/icons/${journey.trip2.icon}.png"/>  `;
  d9.innerHTML = `<img alt="city_photo" src="${journey.trip3.photo}"/>`;
  let saveTrip = document.createElement("button");
  saveTrip.innerHTML = "Save Trip";
  saveTrip.classList.add("saveTrip");
  saveTrip.setAttribute("id", "generate");
  saveTrip.onclick = function (evt) {
    console.log("Event fired", evt.target);
    console.log("clicked");
    let ulList = document.getElementById("list");
    var liItem = document.createElement("li");
    ulList.appendChild(liItem).textContent = d.innerHTML;
    localStorage.setItem("city", d.innerHTML);
    let button = document.createElement("button");
    button.innerHTML = "Delete Trip";
    button.addEventListener("click", removeTrip);
    liItem.appendChild(button);
    ulList.append(liItem);
  };
  insertAfter(containerButton, saveTrip);
  // updateHTML(journey);
  clearInput();
};
function removeTrip(e) {
  e.target.parentNode.remove();
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
