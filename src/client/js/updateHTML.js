import { clearInput } from "./cleanInputField";
/**Global variables */
let d = document.getElementById("demo");
let d1 = document.getElementById("demo1");
let d2 = document.getElementById("demo2");
let d3 = document.getElementById("demo3");
let d4 = document.getElementById("demo4");
let d5 = document.getElementById("demo5");
let d6 = document.getElementById("demo6");
let d7 = document.getElementById("demo7");
let d8 = document.getElementById("demo8");
let d9 = document.getElementById("demo9");
let containerButton = document.getElementById("containerCard");

export const updateUI = () => {
  d.innerHTML = journey.trip.city;
  d1.innerHTML = `Departing ${date}: \n ${diffDays} days to go`;
  d2.innerHTML = journey.trip.country;
  d3.innerHTML = journey.trip.population;
  d4.innerHTML = "Latitude: " + journey.trip.latitude;
  d5.innerHTML = "Longitude: " + journey.trip.longitude;
  d6.innerHTML = journey.trip2.temp + "&deg;C";
  d7.innerHTML = journey.trip2.description;
  d8.innerHTML = `<img alt="forecast_icon" src="https://www.weatherbit.io/static/img/icons/${journey.trip2.icon}.png"/>  `;
  d9.innerHTML = `<img alt="city_photo" src="${journey.trip3.photo}"/>`;
  document.querySelector(".tripInfoForm").style.visibility = "hidden";
  let saveTrip = document.createElement("button");
  saveTrip.innerHTML = "Save Trip";
  saveTrip.classList.add("saveTrip");
  saveTrip.setAttribute("id", "generate");
  // saveTrip.classList.add("myCustomHover");
  saveTrip.onmouseover = function (evt) {
    evt.target.style.cursor = "pointer";
    console.log("mouseover event firing");
  };
  saveTrip.onclick = function (evt) {
    console.log("Event fired", evt.target);
    console.log("clicked");
    setTimeout(() => {
      document.getElementById("generate").style.visibility = "hidden";
      // containerButton.style.display = "none";
      let ulList = document.getElementById("list");
      var liItem = document.createElement("li");
      ulList.appendChild(liItem).textContent = d.innerHTML;
      localStorage.setItem("city", d.innerHTML);
      let button = document.createElement("button");
      button.innerHTML = "Delete Trip";
      button.addEventListener("click", removeTrip);
      liItem.appendChild(button);
      ulList.append(liItem);
      document.querySelector(".tripInfoForm").style.visibility = "visible";
    }, 500);
  };
  insertAfter(containerButton, saveTrip);
  // updateHTML(journey);
  clearInput();
};

function removeTrip(e) {
  e.target.parentNode.remove();
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
