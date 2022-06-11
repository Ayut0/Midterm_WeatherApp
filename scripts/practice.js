//Declare variables
let autocomplete;
let cityName;
const key = "Favorite countries";
const favoriteBtn = document.querySelector("#favBtn");
const select = document.querySelector("#dropDown");
const searchBox = document.querySelector("#searchTextField");
let existArrayInStorage = localStorage.getItem(key);
let parsed = JSON.parse(existArrayInStorage);

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

//Get city name
function onPlaceChanged() {
  let place = autocomplete.getPlace();
  cityName = place.name.split(",")[0];
  return cityName;
}

//create a drop menu options
function createDropDown(cityArray) {
  if (cityArray === null) {
    cityArray = [];
  }
  return cityArray.map((city, index) => {
    return `
            <option style="display: flex; justify-content: flex-around;" value=${index} id=${city}>${city}</option>
        `;
  });
}
createDropDown(parsed);
select.innerHTML = createDropDown(parsed);

if (parsed == null) {
  parsed = [];
}
//click event to add
favoriteBtn.addEventListener("click", () => {
  console.log(cityName);
  if (parsed == null) {
    parsed = [];
  }
  //Check if the city is in the array
  if (parsed.indexOf(cityName) !== -1) {
    alert(`You've already got ${cityName}`);
  }
  // favItems.push(onPlaceChanged());
  parsed.push(onPlaceChanged());
  console.log(parsed);
  let json = JSON.stringify(parsed);
  localStorage.setItem(key, json);
  createDropDown(parsed);
  select.innerHTML = createDropDown(parsed);
  searchBox.value = '';
});

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
  value = '';
}

const favCities = document.querySelectorAll("#favCity");

let value = (parsed.length === 1) ? parsed[0]: '' ;
console.log(value);
select.addEventListener("change", (e) => {
  const selected = e.target.selectedIndex;
  value = e.target.children[selected].id;
  console.log(value);
});

console.log(parsed);
const deleteBtn = document.querySelector("#delBtn");
deleteBtn.addEventListener("click", () => {
  if (value) {
    deleteItem(value);
  }
});
