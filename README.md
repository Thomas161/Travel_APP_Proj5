## Travel_App_Proj5

![travel](https://media.istockphoto.com/vectors/lets-travel-with-cartoon-style-vector-id1074755092?s=170x170)

:world_map: :mountain_snow: :desert_island: :national_park: :airplane: :passenger_ship: :luggage:

Final project of Udacity Front-End Web Developer Nanodegree, a travel app that seraches a city and returns some basic data regarding country, longitude, latitude, date of trip etc .

#### Installation

```
npm install
```

#### Tools/API's

- webpack
- expressjs
- geonames api [geoname](https://www.geonames.org/)
- weatherbit api [weatherbit](https://www.weatherbit.io/api)
- pixabay api [pixabay](https://pixabay.com/)
- Covid-19 api [covid19](https://covid19api.com/)

#### scripts

- `npm run build-dev` dev build using webpack
- `npm run start` start express server
- `npm run test` run jest tests
- `npm run build-prod` build out for production

#### API Keys

- create `.env` inside root of project

```
API_GEONAMES_USERNAME = <YOUR API KEY>
API_PIXABAY_KEY = <YOUR API KEY>
API_WEATHERBIT_KEY = <YOUR API KEY>
```

#### localstorage feature

**localStorage.setItem("city", d.innerHTML);** allows for previous session information based on city to be stored in localstorage
