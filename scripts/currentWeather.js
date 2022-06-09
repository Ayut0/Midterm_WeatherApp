
import nicolasApi from "./nicolasAPIkey.js"

fetch(`https://api.openweathermap.org/data/2.5/weather?q=ambato&appid=${nicolasApi}&units=metric`)
.then((response) => response.json())
.then((result) =>{
  const nameOfCity=result.name
  const loadData=()=>{
    const element=document.querySelector("#currentWeather")
    return element.innerHTML=`
    <h1>${nameOfCity},${result.sys.country}</h1>
    <h2>${result.main.temp}°</h2>
    <h3>H:${result.main.temp_max}°</h3>
    <h3>L:${result.main.temp_min}°</h3>
    <h3>${result.weather[0].description}</h3>
    <h3>Humidity:${result.main.humidity}%</h3>
    <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
    <favorite-star></favorite-star>`
  }
  
  loadData();
// Favorite Star code
  function addRating(obj) {
    $('li').each(function(index) {
      $(this).toggleClass('selected');
      $('#rating').val((index + 1));
      if (index == $("li").index(obj)) {
        return false;
      }
    });
  }
  $("#fav").on('click',function() {
    addRating(this);
  });

// Favorite Bar
const starButton=document.querySelector(".fav__item")
starButton.addEventListener("click",(e)=>{
  if(starButton.classList.contains('selected')){
    if((localStorage.getItem('cityName')==null)){
      localStorage.setItem('cityName','[]')
    }
    let old_data=JSON.parse(localStorage.getItem('cityName'));
    old_data.push(nameOfCity)
    localStorage.setItem('cityName',JSON.stringify(old_data));

  }
})
  console.log(result)
})
  .catch((err)=>{
   console.log(err);
 })