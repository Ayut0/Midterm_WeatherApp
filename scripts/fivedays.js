require("dotenv").config();
process.env.apiKey

fetch(`api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${process.env.apiKey}`)
.then((response) => {
   const weatherData = response.json();
   console.log(weatherData);
}).catch((err)=>{
  console.log(err);
})