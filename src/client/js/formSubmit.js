/**Global Variables */
const fetch = require("node-fetch");
const base = process.env.API_GEONAMES_BASE_URL;
const userName = process.env.API_GEONAMES_USERNAME;

/**Helper functions */
export const formSubmit = async (e) => {
  e.preventDefault();

  let cityData = document.getElementById("city").value;

  const request = await fetch(`${base}q=${cityData}&username=${userName}`);
  console.log("request", request); //404
  console.log("city", cityData);
  //   console.log("Response from api call", convertResponse);
  //   const city = convertResponse;
  try {
    postData("/sent", {
      city,
    });
  } catch (err) {
    console.log(err);
  }
};

// const getFullURL = async (base, city, user) => {
//   const request = await fetch(`${base}q=${city}&username=${user}`);
//   try {
//     const newIncomingData = await request.json();
//     console.log(newIncomingData);
//     return newIncomingData;
//   } catch (err) {
//     console.log(err);
//   }
// };
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
