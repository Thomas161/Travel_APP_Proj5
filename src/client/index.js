import { formSubmit } from "./js/formSubmit";

import "./styles/topbanner.scss";
import "./styles/sectionone.scss";
import "./styles/sectiontwo.scss";
import "./styles/sectionthree.scss";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  let formSub = document.querySelector(".tripInfoForm");
  formSub.addEventListener("submit", formSubmit);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
export { formSubmit };
// console.log(formSubmit(e));
// console.log(updateHTML(e));
