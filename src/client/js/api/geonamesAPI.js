const fetch = require("node-fetch");
//send request to geoname server
const getCityDetail = async (key, city) => {
  console.log("defined city", city);
  try {
    const request = await fetch(
      `    http://api.geonames.org/searchJSON?username=${key}&name=${city}&maxRows=2`
    );
    console.log("Request from fetched api =>", request);

    const res = await request.json();
    console.log("Response back from geonames", res);
    let trip = {};
    trip.city = city;
    trip.country = res.geonames[0].countryName;
    trip.population = res.geonames[0].lng;
    trip.longitude = res.geonames[0].lng;
    trip.latitude = res.geonames[0].lat;
    return trip;
  } catch (err) {
    console.log("Errors fetching geonames api", err);
  }
};
module.exports = { getCityDetail };
