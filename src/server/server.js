// setup express and fetch
const express = require('express');
const fetch = require("node-fetch");
const app = express();

app.use(express.static('dist'))

//use .env file
require("dotenv").config();

//middleware
var bodyParser = require('body-parser');

//keys from env folder
//in case they don't work just replace the ${} with what's commented here
const {
    /**
     *  SERVER_PORT=8000
     *  GEONAMES_USERNAME=bgdnvk
        WEATHERBIT_API_KEY=af5368f75eb640cca2bbfe4761452750
        PIXABAY_API_KEY=16660568-e9324a41d1fc0698eedcbc562
     */
    SERVER_PORT,
    GEONAMES_USERNAME,
    WEATHERBIT_API_KEY,
    PIXABAY_API_KEY
} = process.env;

//express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
const cors = require('cors');
app.use(cors());

//project starts at
app.use(express.static('website'));

//////////Geonames API////////////
app.get('/search', searchGeo);
function searchGeo(req, res){
    fetch(`http://api.geonames.org/searchJSON?q=${req.query.searchquery}&maxRows=1&username=${GEONAMES_USERNAME}`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log('error from searchGeo:'+e));
}

////////////////Pixabay API//////////////
app.get('/locationimg', getPixImg);
function getPixImg(req, res){
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${req.query.countryname}`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log('error fetching pixibay'+e));
}

/////////////////weather API///////////
app.get('/weatherdate', getWeather);

function getWeather(req, res){
    fetch(`http://api.weatherbit.io/v2.0/current?&lat=${req.query.lat}&lon=${req.query.lon}&key=${WEATHERBIT_API_KEY}`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log('error fetching weather'+e));
}

//I wanted to implement another api
//disregard this
/**
 app.get('/countryinfo', getCountryInfo);
function getCountryInfo(req, res){
    let url = 'https://restcountries.eu/rest/v2/name/';
    fetch (url + req.query.capital)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(e => console.log(e));
}
 */
///https://restcountries.eu/
///https://restcountries.eu/rest/v2/name/



//start the server
//#region  comment whats inside this region for Jest Testing
const server = app.listen(SERVER_PORT, listening);
function listening(){
    console.log('initiating server')
    console.log(`server up and runnning @ localhost:${SERVER_PORT}`);
};
module.exports = server
