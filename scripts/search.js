//Declare variables
let autocomplete;
let cityName;
let favItems = [];
const key = "Favorite countries"
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
            types: ['locality'],
            fields: ['name']
        });
    autocomplete.addListener('place_changed', onPlaceChanged);
}

//Get city name
function onPlaceChanged() {
    let place = autocomplete.getPlace();
    // console.log(place.name.split(',')[0]);
    return cityName = place.name.split(',')[0];
}


//create a drop menu options
function createDropDown(cityArray) {
  let cities = "";
  cityArray.forEach((element) => {
    cities += `
                <option value=${element}>${element}</option>
        `;
  });
  return cities;
};
createDropDown(parsed);
section.innerHTML = createDropDown(parsed);

favoriteBtn.addEventListener("click", ()=>{
    onPlaceChanged();
    console.log(favItems);
    console.log(parsed);
    favItems.push(onPlaceChanged());
    parsed.push(onPlaceChanged());
    let json = JSON.stringify(parsed);
    console.log(json);
    localStorage.setItem(key, json);
    createDropDown(parsed);
    section.innerHTML = createDropDown(parsed);
});


