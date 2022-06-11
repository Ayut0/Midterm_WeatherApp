//Declare variables
let autocomplete;
let cityName;
let favItems = [];
let deleteBtn = document.querySelectorAll("#deleteBtn");
const key = "Favorite countries"
const favoriteBtn = document.querySelector("#favBtn");
const section = document.querySelector("#dropDown");

// localStorage.setItem(key, JSON.stringify(favItems));
let existArrayInStorage = localStorage.getItem(key);
let parsed = JSON.parse(existArrayInStorage);
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
    
    if(place===undefined){
      return cityName="Vancouver"
    }
    else{
      return cityName = place.name.split(',')[0];
    }
}


//create a drop menu options
function createDropDown(cityArray) {
  let cities = "";
  if(cityArray === null){
    cityArray = [];
  }
  console.log(cityArray);
  cityArray.forEach((element) => {
    cities += `

                <option style="display: flex; justify-content: flex-around;" value=${element}>${element}</option>
        `;
  });
  return cities;
};
createDropDown(parsed);
section.innerHTML = createDropDown(parsed);

//click event to add
// favoriteBtn.addEventListener("click", ()=>{

//     onPlaceChanged();
//     console.log(favItems);
//     console.log(parsed);
//     if(parsed==null){
//       parsed = [];
//     }
//     favItems.push(onPlaceChanged());
//     parsed.push(onPlaceChanged());
//     let json = JSON.stringify(parsed);
//     console.log(json);
//     localStorage.setItem(key, json);
//     createDropDown(parsed);
//     section.innerHTML = createDropDown(parsed);
// });


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
const starButton=document.querySelector(".fav__item")
const favSelected=document.querySelector("#fav")
starButton.addEventListener("click",(e)=>{
  if(favSelected.classList.contains('selected')){
  onPlaceChanged();
    console.log(favItems);
    console.log(parsed);
    if(parsed==null){
      parsed = [];
    }
    favItems.push(onPlaceChanged());
    parsed.push(onPlaceChanged());
    let json = JSON.stringify(parsed);
    console.log(json);
    localStorage.setItem(key, json);
    createDropDown(parsed);
    section.innerHTML = createDropDown(parsed);
  }
})

// Star selected