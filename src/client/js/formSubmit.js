import { updateUI } from "./updateHTML";

/**Global Variables */
const fetch = require("node-fetch");

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

  let date = document.getElementById("departDate").value;
  console.log(date);
  if (!city) {
    let errorMessage = `Something went wrong ${errorMessage}`;
    alert(errorMessage);
  } else {
    let nowDate = new Date();
    let dateFuture = new Date(date);
    let timePassedMillisecondsCurrent = nowDate.getTime();
    let timePassedMillisecondsFuture = dateFuture.getTime();
    let diffTime = Math.abs(
      timePassedMillisecondsFuture - timePassedMillisecondsCurrent
    );
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("city", city);
    console.log("Current date in time ", timePassedMillisecondsCurrent); //milliseconds returned
    console.log("Future date in time ", timePassedMillisecondsFuture); //milliseconds
    console.log("Diff time", diffTime);
    console.log(diffDays + " days");

    //data to send back to server
    const data = {
      city: city,
      date: date,
    };
    const journey = await postData("http://localhost:8080/tripInfo", data);
    console.log("Response coming back", journey);

    updateUI();
  }
};
