const fetch = require("node-fetch");

const getCovidData = async () => {
  try {
    const coronaRequest = await fetch(
      "https://api.covid19api.com/total/country/australia/status/confirmed?from=2020-11-01T00:00:00Z&to=2020-11-17T00:00:00Z"
    );
    console.log("Request from fetched api =>", coronaRequest);
    const res = await coronaRequest.json();
    console.log("Covid api response", res[0]);
    let cov = {};
    cov.covid19 = res[0].Cases;
    // alert(res[0].Cases);
    console.log("Cases returned", cov);
    // let up = mod.updateModal(cov);
    // up();
    document.getElementById(
      "cases"
    ).innerHTML = `Cases in Australia : ${cov.covid19}`;

    return cov;
  } catch (err) {
    console.log("Errors found => ", err);
  }
};

module.exports = { getCovidData };
