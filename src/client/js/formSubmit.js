const fetch = require("node-fetch");

const getTripInformation = async (url, data) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = await request.text().then(console.log(data));
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
export const formSubmit = async (e) => {
  e.preventDefault();

  let city = document.getElementById("city").value;

  const data = {
    city: city,
  };
  const trip = await getTripInformation("http://localhost:8080/document", data);
  console.log(trip); //undefined
  let d = document.getElementById("demo");
  d.innerHTML = trip;
  console.log("Object : ", typeof trip);
};
