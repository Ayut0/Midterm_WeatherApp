let autocomplete;
let cityName;
const favoriteBtn = document.querySelector("#favBtn");
function initAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.querySelector("#searchTextField"),
        {
            types: ['locality'],
            fields: ['name']
        });
    autocomplete.addListener('place_changed', onPlaceChanged);

    return `
        <span>${cityName}</span>
    `;
}

function onPlaceChanged() {
    let place = autocomplete.getPlace();
    console.log(place.name.split(',')[0]);

    return cityName = place.name.split(',')[0];
}

// const createDropDown = () =>{
//     return `
//         <select>
//             <option>a</option>
//             <option>b</option>
//             <option>c</option>
//         </select>
//     `
// }

let favItems = [];

favoriteBtn.addEventListener("click", ()=>{
    onPlaceChanged();
    favItems.push(onPlaceChanged());
    localStorage.setItem("entry_list", JSON.stringify(favItems));
})

let fav = window.localStorage.getItem("entry_list");
console.log(fav, localStorage.length);

