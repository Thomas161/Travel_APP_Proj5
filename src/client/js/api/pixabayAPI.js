//get pixabay data
export const getImageDetail = async (city, key) => {
  try {
    const request = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${city}&category=travel`
    );
    console.log("request", request);
    const res = await request.json();
    console.log("Response back requesting info from geonames", res);
    let trip = {};

    trip.photo = res.hits[0].previewURL;

    return trip;
  } catch (err) {
    console.log("Errors fetching pixabay api", err);
  }
};
