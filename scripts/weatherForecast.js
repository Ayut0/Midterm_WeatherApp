import apiKeyMeg from "./forecast.js"
import parsed from "./search.js"
console.log(parsed);

//Variable
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let defaultCity = "Vancouver"; //Vancouver (default val)
let lat = 49.2497; //49.2497 (default val: Vancouver)
let lon = -123.1193; //-123.1193 (default val: Vancouver)
let btnCounter = 0;

//Fetch API
async function getWeatherAndForecastAPI (city) {
  try {
    //Fetch Current Weather API
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyMeg}&units=metric`);
    const currentWeatherObj = await responseWeather.json();
    //console.log(currentWeatherObj); //Delete this line later
   
    lat = currentWeatherObj.coord.lat; //49.2497 (default val: Vancouver)
    lon = currentWeatherObj.coord.lon; //-123.1193 (default val: Vancouver)
    
    //Fetch Forecast API
    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyMeg}&units=metric`);
    const forecastObj = await responseForecast.json();
    console.log(forecastObj); //Delete this line later
    
    //Display default cards (Vancouver)
    createThreeHoursCard(forecastObj, 0);
    createFiveDaysCard(forecastObj);
    
    //Get html elements (divs for forecast cards)
    let fivedaysCard = document.querySelectorAll(".fivedays__card");
    let rangeCard = document.querySelectorAll(".range__card");

    if (btnCounter !== 0) {
      //Delete default cards
     rangeCard = document.querySelectorAll(".range__card");
     rangeCard.forEach(function(newRangeCard) {
          newRangeCard.style.display = "none";
     })
     fivedaysCard = document.querySelectorAll(".fivedays__card");
     fivedaysCard.forEach(function(newFivedaysCard) {
          newFivedaysCard.style.display = "none";
     })
     createThreeHoursCard(forecastObj, 0);
     createFiveDaysCard(forecastObj);
   }

    //Get user input (copy from currentWeather.js)
    let inputCity=document.querySelector("#searchTextField");
    let searchBtn=document.querySelector("#searchBtn");
    
    searchBtn.addEventListener('click',z => {
      btnCounter++;
      let inputValue=inputCity.value;
      let firstName;
      if(inputValue.indexOf(",") > -1) {
        firstName= inputValue.split(',')[0];
        } else {
        firstName=inputValue.split(' ')[0]
      }
      // console.log(firstName); //Delete this line later
      //Delete default cards
      rangeCard = document.querySelectorAll(".range__card");
      rangeCard.forEach(function(newRangeCard) {
           newRangeCard.style.display = "none";
      })
      fivedaysCard = document.querySelectorAll(".fivedays__card");
      fivedaysCard.forEach(function(newFivedaysCard) {
           newFivedaysCard.style.display = "none";
      })
     
        defaultCity = firstName;
        getWeatherAndForecastAPI (defaultCity);
      
   }) //end of addEventListener for search button
    
    //Switch 3hr forecast by clicking 5 days cards
    for (let k =0; k < fivedaysCard.length; k++) {
      fivedaysCard[k].addEventListener("click", switchWeather);

      function switchWeather () {
        if (k === 0) {
          alert("0");
          rangeCard = document.querySelectorAll(".range__card");
              rangeCard.forEach(function(card){
                card.style.display = "none";
              })
              createThreeHoursCard(forecastObj, 0);
        } else if (k === 1) {
          alert("1");
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
            card.style.display = "none";
          })
            createThreeHoursCard(forecastObj, 8);
        } else if (k === 2) {
          alert("2");
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
            card.style.display = "none";
          })
              createThreeHoursCard(forecastObj, 16);
        } else if (k === 3) {
          alert("3");
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
            card.style.display = "none";
          })
              createThreeHoursCard(forecastObj, 24);
        } else if (k === 4) {
          alert("4");
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
            card.style.display = "none";
          })
            createThreeHoursCard(forecastObj, 32);
        }
        }
    } //end of for loop for switching card
  } catch(error) {
    console.log("Error ", error);
  }
} //end of getWeatherAndForecastAPI()

getWeatherAndForecastAPI(defaultCity);


//Function for 3hours Forecast
const createThreeHoursCard = function(obj, num) {
  let rangeDIV = document.querySelector(".range");
    for (let i = 0+num; i < 8+num; i++) {
      //Variables (for time)
      let hr = obj.list[i].dt_txt[11];  //[2022-06-XX 18:00:00] grab hour of tens place(for this e.g. = 1)
      let hr2 = obj.list[i].dt_txt[12]; //[2022-06-XX 18:00:00] grab hour of ones place(for this e.g. = 8)
      let hh = hr + hr2; //Concatenate two letters (for this e.g. "1" + "8" = "18")
      
      //Variables (for date)
      let monthOfTens = obj.list[i].dt_txt[5];
      let monthOfOnes = obj.list[i].dt_txt[6];
      let mm = monthOfTens + monthOfOnes;
      let dateOfTens  = obj.list[i].dt_txt[8];
      let dateOfOnes  = obj.list[i].dt_txt[9];
      let dd = dateOfTens + dateOfOnes;

      //Variables (for temp)
      let tempInt = Math.floor(obj.list[i].main.temp); //Make temp. integer
      
      if (hr === "0") {
      //AM
      rangeDIV.innerHTML += 
      `
      <div class="range__card">
        <div class="range__card__date">${mm}/${dd}</div>
        <div class="range__card__time">${hh} AM</div>
        <img class="range__card__img" src="https://openweathermap.org/img/w/${obj.list[i].weather[0].icon}.png">
        <div class="range__card__temp">${tempInt}°</div>
      </div>
      `
      } else {
      //PM
        rangeDIV.innerHTML += 
        `
      <div class="range__card">
        <div class="range__card__date">${mm}/${dd}</div>
        <div class="range__card__time">${hh} PM</div>
        <img class="range__card__img" src="https://openweathermap.org/img/w/${obj.list[i].weather[0].icon}.png">
        <div class="range__card__temp">${tempInt}°</div>
      </div>
        `
      }
    }
  return rangeDIV;
}



//Function for 5days Forecast
const createFiveDaysCard = function(obj) {
  let fivedaysDIV = document.querySelector(".fivedays");

  for (let i = 0; i < obj.list.length; i+=8) {
    //Variables (for date)
   let monthOfTens = obj.list[i].dt_txt[5];
   let monthOfOnes = obj.list[i].dt_txt[6];
   let mm = monthOfTens + monthOfOnes;
   let dateOfTens  = obj.list[i].dt_txt[8];
   let dateOfOnes  = obj.list[i].dt_txt[9];
   let dd = dateOfTens + dateOfOnes;

   //Variables (for temp)
   let tempInt  = Math.floor(obj.list[i].main.temp);
   let tempIntH = Math.floor(obj.list[i].main.temp_max);
   let tempIntL = Math.floor(obj.list[i].main.temp_min);

   //Day
   const d = new Date(obj.list[i].dt_txt);
   let day = weekday[d.getDay()];
   
    fivedaysDIV.innerHTML += 
     `
     <div class="fivedays__card">
       <div class="fivedays__card__date">${mm}/${dd}</div>
       <div class="fivedays__card__day">${day}</div>
       <img class="fivedays__card__img" src="https://openweathermap.org/img/w/${obj.list[i].weather[0].icon}.png">
       <div class="fivedays__card__temp">${tempInt}°</div>
       <div class="fivedays__card__wrapper__highLow">
         <div class="fivedays__card__wrapper__highLow__h">H: ${tempIntH}°</div>
         <div class="fivedays__card__wrapper__highLow__h">L: ${tempIntL}°</div>
       </div>
     </div>
     `
  }
  return fivedaysDIV;
}


// ========
// Add all EventListener
// =============
// window.addEventListener('DOMContentLoaded', (event) => {
  // });