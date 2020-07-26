import mockData from './mock-data/cities.js';

const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [...mockData.JSON.geonames];
let loading = true;
//const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames)).then(loading = true);
const userList = document.querySelector('.city-list');
const userInput = document.querySelector('.search');
const tableHeaders = document.querySelectorAll('[data-val]');
let html;
let changeDirection = false;


function findPlaces(cityInput, cities){
	const regex = new RegExp(cityInput, 'i');

	return cities.filter(city => city.name.match(regex))

}
function displayPlaces(e){

	let filteredCities = cities;
    filteredCities = findPlaces(this.value, cities);
	html = filteredCities.map(city => {
	return `
	 <tr>
		 <td>${city.name}</td>
		 <td>${city.population}</td>
		 <td>${city.adminName1}</td>
	</tr>
	`
    }).join("");

 	userList.innerHTML = html;
}
function loadOn(){
	html = cities.map(city => {
	return `
	<tr>
		 <td>${city.name}</td>
		 <td>${city.population}</td>
		 <td>${city.adminName1}</td>
	</tr>
	`
    }).sort().join("");
	userList.innerHTML = html;
}

function propCompare(value, direction){
	if(direction === true){
	return function (a, b){
		return value === 'population' ? a[value] < b[value] ? 1 : -1 : a[value].localeCompare(b[value]);

	}
}
	return function (a, b){
		return value === 'population' ? a[value] > b[value] ? 1 : -1 : b[value].localeCompare(a[value]);
}}

function headerSort(e){
	let test = cities.sort(propCompare(this.dataset.val, changeDirection));
	let lastElement;
	html = test.map(city => {

	return `
	<tr>
		
		 <td>${city.name}</td>
		 <td>${city.population}</td>
		 <td>${city.adminName1}</td>
		
	</tr>
	`
    }).join("");
	userList.innerHTML = html;
	changeDirection = !changeDirection;
}
userInput.addEventListener('change', displayPlaces);
userInput.addEventListener('keyup', displayPlaces);
tableHeaders.forEach(tableHeader => tableHeader.addEventListener('click', headerSort));

window.addEventListener('load', () =>{
	if(!loading) return console.error('something went wrong')
	 setTimeout(loadOn, 1000)
});

