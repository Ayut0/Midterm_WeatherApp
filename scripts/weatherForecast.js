// import apiKeyMeg from "./forecast.js";
import nicolasApi from "./nicolasAPIkey.js";
// import value from "./search.js"
// (console.log(value));
import parsed from "./search.js" //Get name of favorite cities array

//Variable
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
let defaultCity = "Vancouver"; //Vancouver (default val)
let lat = 49.2497; //49.2497 (default val: Vancouver)
let lon = -123.1193; //-123.1193 (default val: Vancouver)
let btnCounter = 0;
let faveCounter = 0;

//Fetch API
async function getWeatherAndForecastAPI (city) {
  try {
    //Fetch Current Weather API
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${nicolasApi}&units=metric`);
    const currentWeatherObj = await responseWeather.json();
   
    lat = currentWeatherObj.coord.lat; //49.2497 (default val: Vancouver)
    lon = currentWeatherObj.coord.lon; //-123.1193 (default val: Vancouver)
    
    //Fetch Forecast API
    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${nicolasApi}&units=metric`);
    const forecastObj = await responseForecast.json();
    
    //Display default cards (Vancouver)
    createThreeHoursCard(forecastObj, 0);
    createFiveDaysCard(forecastObj);

    //Get html elements (divs for forecast cards)
    let fivedaysCard = document.querySelectorAll(".fivedays__card");
    let rangeCard = document.querySelectorAll(".range__card");
    if (btnCounter !== 0 || faveCounter !== 0) {
      //Delete default cards
     rangeCard = document.querySelectorAll(".range__card");
     rangeCard.forEach(function(newRangeCard) {
          // newRangeCard.style.display = "none";
          newRangeCard.remove();
     })
     fivedaysCard = document.querySelectorAll(".fivedays__card");
     fivedaysCard.forEach(function(newFivedaysCard) {
          // newFivedaysCard.style.display = "none";
          newFivedaysCard.remove();
     })
     createThreeHoursCard(forecastObj, 0);
     createFiveDaysCard(forecastObj);
   }

    //Event for search button
    let inputCity=document.querySelector("#searchTextField");
    let searchBtn=document.querySelector("#searchBtn");

    searchBtn.addEventListener('click',() => {
      btnCounter++;
      let inputValue=inputCity.value;
      let firstName;
      if(inputValue.indexOf(",") > -1) {
        firstName= inputValue.split(',')[0];
        } else {
        firstName=inputValue.split(' ')[0]
      }
      //Delete default cards
      rangeCard = document.querySelectorAll(".range__card");
      rangeCard.forEach(function(newRangeCard) {
          //  newRangeCard.style.display = "none";
          newRangeCard.remove();
      })
      fivedaysCard = document.querySelectorAll(".fivedays__card");
      fivedaysCard.forEach(function(newFivedaysCard) {
          //  newFivedaysCard.style.display = "none";
          newFivedaysCard.remove();
      })
        defaultCity = firstName;
        getWeatherAndForecastAPI (defaultCity);
      
   }) //end of addEventListener for search button

    //Switch 3hr forecast by clicking 5 days cards
    fivedaysCard = document.querySelectorAll(".fivedays__card");
    fivedaysCard.forEach(function(card, index){

      card.addEventListener("click", switchWeather);
  
      function switchWeather () {
        if (index === 0) {
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
                    card.remove();
          })
            createThreeHoursCard(forecastObj, 0);
        } else if (index === 1) {
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
                    card.remove();
                  })
            createThreeHoursCard(forecastObj, 8);
        } else if (index === 2) {
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
                    card.remove();
                  })
             createThreeHoursCard(forecastObj, 16);
        } else if (index === 3) {
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
                    card.remove();
                  })
             createThreeHoursCard(forecastObj, 24);
        } else if (index === 4) {
          rangeCard = document.querySelectorAll(".range__card");
          rangeCard.forEach(function(card){
                    card.remove();
                  })
             createThreeHoursCard(forecastObj, 32);
        }
      }
    })//end of function for switching card
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
window.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault()
  //Event for favorite
  let selectTag = document.querySelector("select");
  // let options = document.querySelectorAll("option");

  let value = parsed.length === 1 ? parsed[0] : "";
  selectTag.addEventListener("change", function(e) {
       faveCounter++;
       const selected = e.target.selectedIndex;
      //  console.log(selectTag);
       value = e.target.children[selected].id;
      //  console.log(value);
       getWeatherAndForecastAPI(value);
   })
});
