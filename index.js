const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [];
const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames))
const userList = document.querySelector('.city-list');
const userInput = document.querySelector('.search');


function findPlaces(cityInput, cities){
	const regex = new RegExp(cityInput, 'i');

	return cities.filter(city => city.name.match(regex))

}


function displayPlaces(e){

	const filteredCities = findPlaces(this.value, cities);
	const html = filteredCities.map(city => {
	return `
	 <li>${city.name}</li>
	`
    }).join("");

 	userList.innerHTML = html;
}

userInput.addEventListener('change', displayPlaces);
userInput.addEventListener('keyup', displayPlaces);