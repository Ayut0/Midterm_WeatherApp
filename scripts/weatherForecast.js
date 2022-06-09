import apiKeyMeg from "./forecast.js"

//Variable
const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const defaultCity = "";
const selectCity = "";
let city = "Vancouver"; //Vancouver (default val)
let lat = 49.2497; //49.2497 (default val: Vancouver)
let lon = -123.1193; //-123.1193 (default val: Vancouver)

//Fetch API
async function getWeatherAndForecastAPI () {
  try {
   //Fetch Current Weather API
   const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyMeg}&units=metric`);
   const currentWeatherObj = await responseWeather.json();
   console.log(currentWeatherObj); //Delete this line later
   
   //Fetch Forecast API
    const responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyMeg}&units=metric`);
    const forecastObj = await responseForecast.json();
    console.log(forecastObj); //Delete this line later
    // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=49.2497&lon=-123.1193&appid=${apiKeyMeg}&units=metric`)
    
    
    //  createThreeHoursCard(forecastObj, 0);
     // createThreeHoursCard(forecastObj, 8);
     // createThreeHoursCard(forecastObj, 16);
     // createThreeHoursCard(forecastObj, 24);
    //  createThreeHoursCard(forecastObj, 32);

    createFiveDaysCard(forecastObj);

    let fivedaysCard = document.querySelectorAll(".fivedays__card");
    console.log(fivedaysCard);
    for (let j =0; j < fivedaysCard.length; j++) {
      fivedaysCard[j].addEventListener("click", switchWeather);

      function switchWeather () {
        switch (j) {
          case j=0:
            alert("0");
            createThreeHoursCard(forecastObj, 0);
            break;
          case j=1:
            alert("1");
            createThreeHoursCard(forecastObj, 8);
            break;
            case j=2:
              alert("2");
              createThreeHoursCard(forecastObj, 16);
              break;
              case j=3:
            alert("3");
            createThreeHoursCard(forecastObj, 24);
            break;
            case j=4:
              alert("4");
              createThreeHoursCard(forecastObj, 32);
              break;
          default:
            alert("de");
        }
        }
    }

    




  } catch(error) {
    console.log("Error ", error);
  }
}

getWeatherAndForecastAPI();

//3hours Forecast
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



//5days Forecast
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
  // let test = document.querySelector(".fivedays__card");
  // console.log(test);
  // test.addEventListener("click", myFunk);

  // function myFunk () {
  //   alert("Hello");
  // }
  
  //In 5 days forecast cards,
  //If I click card[1], change 3hrs range cards based on the card you clicked in 5 days cards
  
    
  });