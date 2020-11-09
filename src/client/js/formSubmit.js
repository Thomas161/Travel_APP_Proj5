/**Global Variables */
const fetch = require("node-fetch");
// const BASE_URL = process.env.API_GEONAMES_BASE_URL;
// console.log(BASE_URL);
// const USERNAME = process.env.API_GEONAMES_USERNAME;
// console.log(USERNAME);

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
    console.log("Incoming data =>", newIncomingData);
    return newIncomingData;
  } catch (err) {
    console.log("Error here", err);
  }
};
export const formSubmit = async (e) => {
  e.preventDefault();

  let city = document.getElementById("city").value;
  console.log("city", city); //input value from dom

  //data to send back to server
  const data = {
    city: city,
  };
  const journey = await postData("http://localhost:8080/tripInfo", data);
  console.log("Response coming back", journey);
};

// const getFullURL = async (url, city, user) => {
//   const request = await fetch(`${url}q=${city}&username=${user}`);
//   try {
//     const newIncomingData = await request.json();
//     console.log(newIncomingData);
//     return newIncomingData;
//   } catch (err) {
//     console.log(err);
//   }
// };
