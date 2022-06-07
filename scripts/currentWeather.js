
import nicolasApi from "./currentWeather1.js"

fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${nicolasApi}`)
.then((response) => {
    const Currentweather = response.json();
    console.log(Currentweather);
 }).catch((err)=>{
   console.log(err);
 })