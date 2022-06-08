import apiKeyMeg from "./forecast.js"
//Variable
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// //Get API
async function getForecastAPI () {
   try {
     const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=49.2497&lon=-123.1193&appid=${apiKeyMeg}&units=metric`);
     const forecastObj = await responseForecast.json();
     console.log(forecastObj);
     
     let mainTag = document.querySelector("main");
     for (let i = 0; i < 5; i++) {
      let tempInt = Math.floor(forecastObj.list[i].main.temp);
      //Day
      const d = new Date(forecastObj.list[i].dt_txt);
      let day = weekday[d.getDay()];
      //  console.log(day);

       mainTag.innerHTML += 
        `
        <div class="fiveDays__day">${day}</div>
        <img class="fiveDays__img" src="#">
        <div class="fiveDays__temp">${tempInt}°</div>
        <div class="fiveDays__wrapper__highLow">
         <div class="fiveDays__wrapper__highLow__h">H: ${forecastObj.list[i].main.temp_max}°</div>
         <div class="fiveDays__wrapper__highLow__h">L: ${forecastObj.list[0].main.temp_min}°</div>
        </div>
        `
     }
    
   } catch(error) {
     console.log("Error ", error);
   }
}

getForecastAPI();





// 5days forecast
// - Day
// - Icon
// - Temp
// - H-temp, L-temp

// ========
// Add all EventListener
// =============
// window.addEventListener('DOMContentLoaded', (event) => {
  
// });