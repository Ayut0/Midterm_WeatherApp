import apiKeyMeg from "./fivedays1.js"
// require("dotenv").config();
// process.env.apiKey
// process.env.apiURL

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${apiKeyMeg}`)
.then((response) => {
   const weatherData = response.json();
   console.log(weatherData);
}).catch((err)=>{
  console.log(err);
})