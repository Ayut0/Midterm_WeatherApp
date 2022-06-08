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

favoriteBtn.addEventListener("click", ()=>{
    onPlaceChanged();
    localStorage.setItem("entry_list", JSON.stringify(onPlaceChanged()));
})

