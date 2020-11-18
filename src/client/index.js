import { formSubmit } from "./js/formSubmit";
import { getCovidData } from "./js/api/covid19API";

import "./styles/topbanner.scss";
import "./styles/sectionone.scss";
import "./styles/sectiontwo.scss";
import "./styles/sectionthree.scss";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  let formSub = document.querySelector(".tripInfoForm");
  formSub.addEventListener("submit", formSubmit);
  let modalClick = document.querySelector("#ulCovid");
  modalClick.addEventListener("click", getCovidData);
});

document.getElementById(
  "departDate"
).value = new Date().toISOString().substring(0, 10);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
export { formSubmit, getCovidData };
// console.log(formSubmit(e));
// console.log(updateHTML(e));
