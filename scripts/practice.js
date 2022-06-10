//Declare variables
let autocomplete;
let cityName;
let favItems = [];
const key = "Favorite countries";
const favoriteBtn = document.querySelector("#favBtn");
const select = document.querySelector("#dropDown");

// localStorage.setItem(key, JSON.stringify(favItems));
let existArrayInStorage = localStorage.getItem(key);
let parsed = JSON.parse(existArrayInStorage);
// console.log(parsed);

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
  // console.log(cityName);
  return cityName;
}


//create a drop menu options
function createDropDown(cityArray) {
  if(cityArray === null){
    cityArray = [];
  }
  // console.log(cityArray);
  return cityArray.map((city, index) =>{
    return(
        `
            <option style="display: flex; justify-content: flex-around;" value=${index} id="favCity">${city}</option>
        `
        )
  })
}
createDropDown(parsed);
select.innerHTML = createDropDown(parsed);

//click event to add
favoriteBtn.addEventListener("click", () => {
  console.log(cityName);
  console.log(parsed);
  if (parsed == null) {
    parsed = [];
  }
//Check if the city is in the array
  if(parsed.indexOf(cityName) !== -1){
    alert(`You've already got ${cityName}`);
  }
  favItems.push(onPlaceChanged());
  parsed.push(onPlaceChanged());
  let json = JSON.stringify(parsed);
  localStorage.setItem(key, json);
  createDropDown(parsed);
  select.innerHTML = createDropDown(parsed);
});

//Delete
function deleteItem(name) {
    const newArray = parsed.filter((item)=>{
        return name !== item
    })
    console.log(newArray);
    let newData = JSON.stringify(newArray);
    localStorage.setItem(key, newData)
    createDropDown(newArray);
    select.innerHTML = createDropDown(newArray);
}
// deleteItem("Houston");

const favCities = document.querySelectorAll("#favCity");

// const setValue;
let value;
function setValue() {
  if (value === undefined) {
    console.log("Defined");
    value = select.options[select.selectedIndex].innerHTML;
    console.log(value)
  }

  return value;
}
console.log(value);
console.log(parsed);
const deleteBtn = document.querySelector("#delBtn");
deleteBtn.addEventListener("click", () =>{
  setValue();
  deleteItem(setValue());
});
