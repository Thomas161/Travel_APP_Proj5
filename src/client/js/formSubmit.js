const fetch = require("node-fetch");

const getTripInformation = async (url, data) => {
  const request = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const data = await request;
    console.log("What the hell is this => ", data); //response object
    return data;
  } catch (error) {
    console.log("Error", error);
  }
  return request;
};
export const formSubmit = async (e) => {
  e.preventDefault();

  let cityData = document.getElementById("city").value;

  const trip = await getTripInformation(
    "http://localhost:8080/document",
    cityData
  ).then((w) => console.log("what is in here", w));
  console.log("Whats this", trip);
  //   let d = document.getElementById("demo");
  //   d.innerHTML = data;
  //   console.log("Object : ", typeof trip);
};
