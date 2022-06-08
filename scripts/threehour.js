import apiKeyMeg from "./forecast.js"
// const monthArr = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec];

async function getForecastAPI () {
  try {
    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=49.2497&lon=-123.1193&appid=${apiKeyMeg}&units=metric`);
    const forecastObj = await responseForecast.json();
    console.log(forecastObj); //Delete this line later
    
    let rangeDIV = document.querySelector(".range");
    for (let i = 0; i < 8; i++) {
      //Variables (for time)
      let hr = forecastObj.list[i].dt_txt[11];  //[2022-06-XX 18:00:00] grab hour of tens place(for this e.g. = 1)
      let hr2 = forecastObj.list[i].dt_txt[12]; //[2022-06-XX 18:00:00] grab hour of ones place(for this e.g. = 8)
      let hh = hr + hr2; //Concatenate two letters (for this e.g. "1" + "8" = "18")
      
      //Variables (for date)
      let monthOfTens = forecastObj.list[i].dt_txt[5];
      let monthOfOnes = forecastObj.list[i].dt_txt[6];
      let mm = monthOfTens + monthOfOnes;
      let dateOfTens  = forecastObj.list[i].dt_txt[8];
      let dateOfOnes  = forecastObj.list[i].dt_txt[9];
      let dd = dateOfTens + dateOfOnes;

      //Variables (for temp)
      let tempInt = Math.floor(forecastObj.list[i].main.temp); //Make temp. integer
      
      if (hr === "0") {
      //AM
      rangeDIV.innerHTML += 
      `
      <div class="range__card">
        <div class="range__card__date">${mm}/${dd}</div>
        <div class="range__card__time">${hh} AM</div>
        <img class="range__card__img" src="#">
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
        <img class="range__card__img" src="#">
        <div class="range__card__temp">${tempInt}°</div>
      </div>
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