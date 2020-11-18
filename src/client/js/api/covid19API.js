export const getCovidData = async () => {
  try {
    const coronaRequest = await fetch(
      "https://api.covid19api.com/total/country/australia/status/confirmed?from=2020-11-01T00:00:00Z&to=2020-11-17T00:00:00Z"
    );
    console.log("Request from fetched api =>", coronaRequest);
    const res = await coronaRequest.json();
    console.log("Covid api response", res);
    let covid = {};
    covid.cases = res.Cases[0];
  } catch (err) {
    console.log("Errors found => ", err);
  }
};
