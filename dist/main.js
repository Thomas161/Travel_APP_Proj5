var Client =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "formSubmit", function() { return /* reexport */ formSubmit; });

// CONCATENATED MODULE: ./src/client/js/cleanInputField.js
const clearInput = () => {
  return (document.getElementById("city").value = "");
};

// CONCATENATED MODULE: ./src/client/js/formSubmit.js


/**Global Variables */

const fetch = __webpack_require__(0);
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

/**Helper functions */
// async post data to server
const postData = async (url = "", data = {}) => {
  let res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newIncomingData = await res.json();
    console.log("Incoming data =>", newIncomingData.trip);
    return newIncomingData;
  } catch (err) {
    console.log("Error here", err);
  }
};

const formSubmit = async (e) => {
  e.preventDefault();

  let city = document.getElementById("city").value;
  let date = document.getElementById("depart_date").value;
  let nowDate = new Date();
  let dateFuture = new Date(date);
  let timePassedMillisecondsCurrent = nowDate.getTime();
  let timePassedMillisecondsFuture = dateFuture.getTime();
  let diffTime = Math.abs(
    timePassedMillisecondsFuture - timePassedMillisecondsCurrent
  );
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log("city", city);
  // console.log("date departure", date);
  // console.log("Current date", nowDate);
  console.log("Current date in time ", timePassedMillisecondsCurrent); //milliseconds returned
  console.log("Future date in time ", timePassedMillisecondsFuture); //milliseconds
  console.log("Diff time", diffTime);
  console.log(diffDays + " days");

  //data to send back to server
  const data = {
    city: city,
  };
  const journey = await postData("http://localhost:8080/tripInfo", data);
  console.log("Response coming back", journey);

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
  let saveTrip = document.createElement("button");
  saveTrip.innerHTML = "Save Trip";
  saveTrip.classList.add("saveTrip");
  saveTrip.setAttribute("id", "generate");
  saveTrip.onclick = function (evt) {
    console.log("Event fired", evt.target);
    console.log("clicked");
    setTimeout(() => {
      document.getElementById("generate").style.display = "none";
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

// CONCATENATED MODULE: ./src/client/styles/topbanner.scss
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/client/styles/sectionone.scss
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/client/styles/sectiontwo.scss
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/client/styles/sectionthree.scss
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/client/index.js








// console.log(formSubmit(e));
// console.log(updateHTML(e));


/***/ })
/******/ ]);