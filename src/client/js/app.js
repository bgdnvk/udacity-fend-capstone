import { getPixImg } from './pixImg.js'
import fetch from 'node-fetch';
//require moment for date countdown
var moment = require('moment');
moment().format();
//calculate days left for trip
function calculateDays(){
    const start = moment(new Date()); //START date
    const end = moment(document.querySelector('#date_input').value); // END date
    const duration = moment.duration(start.diff(end)); //calculate the duration
    //return the result
    const days = duration.asDays();
    document.querySelector('#days-to-trip').value = Math.round(Math.abs(days));

}

//resets image when you press the button
function resetImg(){
    document.getElementById("piximage").src = '';
}

const getDestinationServer = async(url = '')=>{
    try{
        const promiseFetch = await fetch(url);
        const jsonResults = await promiseFetch.json();
        return jsonResults;
    }catch(error){
        console.log(error);
   }
};


//sends weather information to server
async function sendWeatherInformation(placeinfo){
    const lat = placeinfo.geonames[0].lat;
    const lng =  placeinfo.geonames[0].lng;
    //const lon = placeinfo.geonames[0].lon;
    console.log('lng from placeinfo '+placeinfo.geonames[0].lng);
    //doesn't exist
    //console.log('lon from placeinfo '+placeinfo.geonames[0].lon);
    
    //not sure if the await is worth it?
    //await getWeatherServer(lat, lng);
    const weatherData = await getWeatherServer(lat, lng);
    return true;
}


//give back all the information to the UI after knowing the destination
function fillInformation(destination){


    document.querySelector('#destination-search').innerHTML = `You searched for ${destination.geonames[0].toponymName}`;
    document.querySelector('#placelatprint').innerHTML = `Latitude ${destination.geonames[0].lat}`;
    //this used to be lng and worked
    document.querySelector('#placelonprint').innerHTML = `Longitude ${destination.geonames[0].lng}`;
    document.querySelector('#country').innerHTML = `Country: ${destination.geonames[0].countryName}`;

    document.querySelector('#population').innerHTML = `Population: ${destination.geonames[0].population}`;

    getPixImg(destination.geonames[0].toponymName);
    return true;
}

/**
 * wanted to implement a function to make above easier, didn't have time
 function destinationFillHTML(id, text, destinationData){
    document.getElementById(id).innerHTML = `${text} ${destinationData}`;
}
 */


//get weather given lat and long
//some of the code was from: https://pt.stackoverflow.com/questions/428781/fetch-sempre-retorna-typeerror-body-has-already-been-consumed-como-corrigi
function getWeatherServer(lat, lng){
  fetch(`/weatherdate?lat=${lat}&lon=${lng}`)
  .then(function(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.data[0]);
    console.log(data.data[0].temp);
    console.log(data.data[0].weather.description);

    document.querySelector('#weather-temperature').innerHTML = `The temperature is ${data.data[0].temp}ºC`;
    document.querySelector('#weather-description').innerHTML = `${data.data[0].weather.description}`;
    
  })
  .catch(function(error) {
    console.error("err @ getWeatherServer is " + error);
  })
}


//get info about your destination
async function getDestination() {
    //calculate time until trip starts
    calculateDays();
    let placeName = document.querySelector('#travel-destination').value;
    resetImg();

    if(placeName !== ''){
        let myDestination = await getDestinationServer(`/search?searchquery=${placeName}`);
        console.log('before sending weather info, mydestination is: '+myDestination);
        sendWeatherInformation(myDestination);
        fillInformation(myDestination);
        return true;
    }
    else{
        alert('Tell me where you wanna go please :)');
        return false;
    }
};


//initiates button event listener
function initBtnPage(){
    document.getElementById('generate').addEventListener('click', getDestination);
}
initBtnPage();

export { getDestination }
export { sendWeatherInformation }
export { initBtnPage }