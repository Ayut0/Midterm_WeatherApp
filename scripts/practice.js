//Declare variables
let autocomplete;
let cityName;
let favItems = [];
let deleteBtn = document.querySelectorAll("#deleteBtn");
const key = "Favorite countries";
const favoriteBtn = document.querySelector("#favBtn");
const section = document.querySelector("#dropDown");

// localStorage.setItem(key, JSON.stringify(favItems));
let existArrayInStorage = localStorage.getItem(key);
let parsed = JSON.parse(existArrayInStorage);
console.log(parsed);

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

  console.log(cityName);
  return cityName;
}


//create a drop menu options
function createDropDown(cityArray) {
  let cities = "";
  if(cityArray === null){
    cityArray = [];
  }
  cityArray.forEach((element) => {
    cities += `
                <option style="display: flex; justify-content: flex-around;" value=${element}>${element} <div id="deleteBtn">delete</div> </option>
        `;
  });
  return cities;
}
createDropDown(parsed);
section.innerHTML = createDropDown(parsed);

//click event to add
favoriteBtn.addEventListener("click", () => {
  console.log(cityName);
  console.log(parsed);
//Check if the city is in the array
  if(parsed.indexOf(cityName) !== -1){
    alert(`You've already got ${cityName}`);
  }
  favItems.push(onPlaceChanged());
  parsed.push(onPlaceChanged());
  let json = JSON.stringify(parsed);
//   console.log(json);
  localStorage.setItem(key, json);
  createDropDown(parsed);
  section.innerHTML = createDropDown(parsed);
});

//Delete
function deleteItem() {

}