import apiKeyMeg from "./forecast.js"
//Variable
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// //Get API
async function getForecastAPI () {
   try {
     const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=49.2497&lon=-123.1193&appid=${apiKeyMeg}&units=metric`);
     const forecastObj = await responseForecast.json();
     console.log(forecastObj);
     
     let fivedaysDIV = document.querySelector(".fivedays");

     for (let i = 0; i < forecastObj.list.length; i+=8) {
       //Variables (for date)
      let monthOfTens = forecastObj.list[i].dt_txt[5];
      let monthOfOnes = forecastObj.list[i].dt_txt[6];
      let mm = monthOfTens + monthOfOnes;
      let dateOfTens  = forecastObj.list[i].dt_txt[8];
      let dateOfOnes  = forecastObj.list[i].dt_txt[9];
      let dd = dateOfTens + dateOfOnes;

      //Variables (for temp)
      let tempInt  = Math.floor(forecastObj.list[i].main.temp);
      let tempIntH = Math.floor(forecastObj.list[i].main.temp_max);
      let tempIntL = Math.floor(forecastObj.list[i].main.temp_min);

      //Day
      const d = new Date(forecastObj.list[i].dt_txt);
      let day = weekday[d.getDay()];
      
       fivedaysDIV.innerHTML += 
        `
        <div class="fivedays__card">
          <div class="fivedays__card__date">${mm}/${dd}</div>
          <div class="fivedays__card__day">${day}</div>
          <img class="fivedays__card__img" src="#">
          <div class="fivedays__card__temp">${tempInt}°</div>
          <div class="fivedays__card__wrapper__highLow">
            <div class="fivedays__card__wrapper__highLow__h">H: ${tempIntH}°</div>
            <div class="fivedays__card__wrapper__highLow__h">L: ${tempIntL}°</div>
          </div>
        </div>
        `
     }
    
   } catch(error) {
     console.log("Error ", error);
   }
}

getForecastAPI();





// 5days forecast
// - Date (added)
// - Day
// - Icon
// - Temp
// - H-temp, L-temp

// ========
// Add all EventListener
// =============
// window.addEventListener('DOMContentLoaded', (event) => {
  
// });