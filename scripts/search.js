import nicolasApi from "./nicolasAPIkey.js";
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

window.addEventListener("DOMContentLoaded", ()=>{
  //Auto complete function
  function initAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(
      document.querySelector("#searchTextField"),
      {
        types: ["locality"],
        fields: ["name"],
      }
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
  }
  initAutoComplete();
  //Get city name
  function onPlaceChanged() {
    let place = autocomplete.getPlace();

    place === undefined
      ? (cityName = "Vancouver")
      : (cityName = place.name.split(",")[0]);
    // console.log(cityName);
    return cityName;
  }

  //Check if local storage is empty.
  //If it is, store empty array as a initial value to use array methods
  if (parsed == null) {
    parsed = [];
  }

  //create a drop menu options
  function createDropDown(cityArray) {
    if (cityArray === null) {
      cityArray = [];
      return `
              <option hidden">Favorite</option>
          `;
    }
    // console.log(cityArray);
    return cityArray.map((city, index) => {
      return `
              <option value=${index} id=${city}>${city}</option>
          `;
    });
  }
  (function initialDropDown(){
    // console.log(parsed);
    createDropDown(parsed);
    select.innerHTML = createDropDown(parsed);
  }());

  let value = parsed.length >= 1 ? parsed[0] : "";

  //Create a current weather
  const createCurrentWeatherCard = (city)=>{
    const lowestTemperature = Math.floor(city.main.temp_min);
    const highestTemperature = Math.floor(city.main.temp_max);
    const temperatureRealTime = Math.floor(city.main.temp);
    const nameOfCity = city.name;

    const element = document.querySelector("#currentWeather");
    return (element.innerHTML = `
          <h1>${nameOfCity},${city.sys.country}</h1>
          <h2>${temperatureRealTime}&#8451</h2>
          <h3>H:${highestTemperature}&#8451</h3>
          <h3>L:${lowestTemperature}&#8451</h3>
          <h3>${city.weather[0].description}</h3>
          <h3>Humidity:${city.main.humidity}%</h3>
          <img src="https://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="result.weather[0].description"> </img>
          <favorite-star></favorite-star>`);
  }

  select.addEventListener("change", (e) => {
    const selected = e.target.selectedIndex;
    value = e.target.children[selected].innerHTML;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${nicolasApi}&units=metric`
    )
      .then((response) => response.json())
      .then((result) => {
        //Error check if it is able to fetch data
        if (result.cod !== 200) {
          throw new Error();
        }
        //Create weather card according to data
        createCurrentWeatherCard(result);
        
        const favoriteStars = document.querySelector("#fav");
        if (!(parsed === null)) {
          if (parsed.includes("Vancouver") === true) {
            favoriteStars.classList.add("selected");
          } else {
            favoriteStars.classList.remove("selected");
          }
        }

        if (parsed.includes(value)) {
          starButton.classList.add("selected");
        }
        return value;
      })

      .catch((err) => {
        console.log(err);
      });
  });

  //Toggling Star Code
  function addRating(obj) {
    $("li").each(function (index) {
      $(this).toggleClass("selected");
      $("#rating").val(index + 1);
      if (index == $("li").index(obj)) {
        return false;
      }
    });
  }
  $("#fav").on("click", function () {
    addRating(this);
  });

  //Add to Favorite
  starButton.addEventListener("click", () => {
    if (favSelected.classList.contains("selected")) {
      existArrayInStorage = localStorage.getItem(key);
      let parsedStorage = JSON.parse(existArrayInStorage);

      if (parsedStorage === null) {
        parsedStorage = [];
      }
      if (parsedStorage.includes(cityName)) {
        alert(`You've already got this city`);
        searchBox.value = "";
        return;
      }

      let newFavoriteList = [...parsedStorage, cityName];
      let json = JSON.stringify(newFavoriteList);
      localStorage.setItem(key, json);
      createDropDown(newFavoriteList);
      select.innerHTML = createDropDown(newFavoriteList);
      searchBox.value = "";
    } else {
      deleteItem(value);
    }
  });

  //Delete
  function deleteItem(name) {
    //load local storage
    existArrayInStorage = localStorage.getItem(key);
    parsed = JSON.parse(existArrayInStorage);
    let newArray = parsed.filter((item) => {
      return name !== item;
    });

    let newData = JSON.stringify(newArray);
    localStorage.setItem(key, newData);
    createDropDown(newArray);
    document.getElementById(name).remove();
    value = "";
  }

  //Compare the local storage and select box
  if (parsed.includes(value)) {
    starButton.classList.add("selected");
  }
})
