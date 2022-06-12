// import loadData from "./currentWeather";
import nicolasApi from "./nicolasAPIkey.js";
// import getWeatherAndForecastAPI from "./weatherForecast.js"

//Declare variables
let autocomplete;
let cityName;
const key = "Favorite countries"
const select = document.querySelector("#dropDown");
const searchBox = document.querySelector("#searchTextField");
let existArrayInStorage = localStorage.getItem(key);
let parsed = JSON.parse(existArrayInStorage);
const starButton = document.querySelector(".fav__item");
const favSelected = document.querySelector("#fav");
export default parsed;

//Auto complete function
function initAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.querySelector("#searchTextField"),
        {
            types: ['locality'],
            fields: ['name']
        });
    autocomplete.addListener('place_changed', onPlaceChanged);
}
initAutoComplete();
//Get city name
function onPlaceChanged() {
    let place = autocomplete.getPlace();

    place === undefined
      ? (cityName = "Vancouver")
      : (cityName = place.name.split(",")[0]);

      return cityName;
}

//create a drop menu options
function createDropDown(cityArray) {
  if(cityArray === null){
    cityArray = [];
  }
  console.log(cityArray);

  return cityArray.map((city, index) => {
    return `
            <option style="display: flex; justify-content: flex-around;" value=${index} id=${city}>${city}</option>
        `;
  });
};
createDropDown(parsed);
select.innerHTML = createDropDown(parsed);
if (parsed == null) {
  parsed = [];
}

//click event to add
starButton.addEventListener("click", () => {
  console.log(parsed);
  if (parsed == null) {
    parsed = [];
  }
  parsed.push(onPlaceChanged());
  let json = JSON.stringify(parsed);
  localStorage.setItem(key, json);
  createDropDown(parsed);
  select.innerHTML = createDropDown(parsed);
  searchBox.value = "";
});

// Star Code
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
starButton.addEventListener("click",()=>{
  if(favSelected.classList.contains('selected')){
    onPlaceChanged();
    console.log(parsed);
    if(parsed == null){
      parsed = [];
    }
    parsed.push(onPlaceChanged());
    let json = JSON.stringify(parsed);
    // console.log(json);
    localStorage.setItem(key, json);
    createDropDown(parsed);
    section.innerHTML = createDropDown(parsed);
  }
})

//Delete
function deleteItem(name) {
  const newArray = parsed.filter((item) => {
    return name !== item;
  });
  console.log(newArray);
  let newData = JSON.stringify(newArray);
  console.log(newData);
  localStorage.setItem(key, newData);
  document.getElementById(name).remove();
  value = "";
}
// const favCities = document.querySelectorAll("#favCity");

let value = parsed.length === 1 ? parsed[0] : "";
console.log(value);
select.addEventListener("change", (e) => {
  const selected = e.target.selectedIndex;
  value = e.target.children[selected].id;
  console.log(value);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${nicolasApi}&units=metric`
  )
    .then((response) => response.json())
    .then((result) => {
      const lowestTemperature = Math.floor(result.main.temp_min);
      const highestTemperature = Math.floor(result.main.temp_max);
      const temperatureRealTime = Math.floor(result.main.temp);
      const nameOfCity = result.name;

      const loadData = () => {
        const element = document.querySelector("#currentWeather");
        return (element.innerHTML = `
          <h1>${nameOfCity},${result.sys.country}</h1>
          <h2>${temperatureRealTime}°</h2>
          <h3>H:${highestTemperature}°</h3>
          <h3>L:${lowestTemperature}°</h3>
          <h3>${result.weather[0].description}</h3>
          <h3>Humidity:${result.main.humidity}%</h3>
          <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="result.weather[0].description"> </img>
          <favorite-star></favorite-star>`);
      };
      loadData();

      const favoriteStars = document.querySelector("#fav");
      if (!(parsed === null)) {
        if (parsed.includes("Vancouver") === true) {
          favoriteStars.classList.add("selected");
        } else {
          favoriteStars.classList.remove("selected");
        }
      }
      console.log(result);
      return value;
    })

    .catch((err) => {
      console.log(err);
    });
});

console.log(parsed);
// const deleteBtn = document.querySelector("#delBtn");
// deleteBtn.addEventListener("click", () => {
//   if (value) {
//     deleteItem(value);
//   }
// });
// Star selected

