const fetch = require("node-fetch");
const formSubmit = (e) => {
  e.preventDefault();
  let base = process.env.API_GEONAMES_BASE_URL;
  let user = process.env.API_GEONAMES_USERNAME;
  console.log(base + user);
  fetch(`${base}${user}`)
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      updateHTML(data);
    })
    .catch((e) => console.log("error ==>", e));

  //   console.log("api returned in form => ", api);
};
const updateHTML = (data) => {
  let d = document.getElementById("demo");
  d.innerHTML = data.toponymName;
};
export { formSubmit, updateHTML };
