const fetch = require("node-fetch");
//get weatherbit data
const getWeatherDetail = async (city, date, key) => {
  try {
    const request = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`
    );
    console.log("request", request);
    const res = await request.json();
    console.log("Response back requesting info from weatherbit", res);
    let trip = {};
    trip.temp = res.data.filter((t) => t.valid_date == date)[0].temp;
    trip.description = res.data.filter(
      (d) => d.valid_date == date
    )[0].weather.description;
    trip.icon = res.data.filter((i) => i.valid_date == date)[0].weather.icon;
    return trip;
  } catch (err) {
    console.log("Errors fetching weatherbit api", err);
  }
};

module.exports = { getWeatherDetail };
