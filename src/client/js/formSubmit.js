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
    console.log("Incoming data =>", newIncomingData);
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
  // console.log("Response coming back", journey);

  let d = document.getElementById("demo");
  d.innerHTML = journey;
  // updateHTML(journey);
  clearInput();
};

const clearInput = () => {
  return (document.getElementById("city").value = "");
};
