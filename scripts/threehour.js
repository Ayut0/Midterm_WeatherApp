import apiKeyMeg from "./forecast.js"


//Get API
async function getForecastAPI () {
  try {
    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=49.2497&lon=-123.1193&appid=${apiKeyMeg}&units=metric`);
    const forecastObj = await responseForecast.json();
    console.log(forecastObj);
    
    let mainTag = document.querySelector("main");
    for (let i = 0; i < 8; i++) {
      let hr = forecastObj.list[i].dt_txt[11];
      let hr2 = forecastObj.list[i].dt_txt[12];
      let twoDigit = hr + hr2;
      let twoDigitNum = Number(twoDigit);
      let twoDigitNumMinus3 = twoDigitNum - 3;
      let tempInt = Math.floor(forecastObj.list[i].main.temp);
      
      if (i === 7) {
      mainTag.innerHTML += 
      `
      <div class="range__time"> 21 - ${twoDigitNum}</div>
      <img class="range__img" src="#">
      <div class="range__temp">${tempInt}°</div>
      `
      } else {
        mainTag.innerHTML += 
        `
        <div class="range__time">${twoDigitNumMinus3} - ${twoDigitNum}</div>
        <img class="range__img" src="#">
        <div class="range__temp">${tempInt}°</div>
        `
      }
  
    }
  } catch(error) {
    console.log("Error ", error);
  }
}

// getForecastAPI();






//=============
// Add all EventListener
// =============
// window.addEventListener('DOMContentLoaded', (event) => {
  
// });