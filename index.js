import mockData from './mock-data/cities.js';

const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [...mockData.JSON.geonames];
let filteredCities = cities;
let loading = true;
//const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames)).then(loading = true);
const userList = document.querySelector('.city-list');
const userInput = document.querySelector('.search');
const tableRow = document.querySelector('.tRow');
const tableHeaders = document.querySelectorAll('[data-val]');
let html;
let changeDirection = false;
let target = 0;


function findPlaces(cityInput, cities){
	const regex = new RegExp(cityInput, 'i');

	return cities.filter(city => city.name.match(regex))

}
function mapCities(cities){
	let mapArr = cities.map(city => {
	return `
	 <tr>
		 <td>${city.name}</td>
		 <td>${city.population}</td>
		 <td>${city.adminName1}</td>
	</tr>
	`
    }).join("");

    return mapArr;
}

function displayPlaces(e){

	filteredCities = cities;
    filteredCities = findPlaces(this.value, cities);
	html = mapCities(filteredCities);

 	userList.innerHTML = html;
}
function loadOn(){
	html = mapCities(cities);
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

function decodeHtmlCharCodes(str) { 
  return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}

function headerSort(e){
	let sortedCities = filteredCities.sort(propCompare(this.dataset.val, changeDirection));
	let icon;
	let innerText = this.innerText
	html = mapCities(sortedCities);
	userList.innerHTML = html;
	icon = !changeDirection ? decodeHtmlCharCodes('&#10506;') : decodeHtmlCharCodes('&#10507;')
	this.style.background = "red";
	this.innerText = this.dataset.name + icon;
	changeDirection = !changeDirection;
	this.classList.remove('active');
}

userInput.addEventListener('change', displayPlaces);
userInput.addEventListener('keyup', displayPlaces);
tableHeaders.forEach(tableHeader => tableHeader.addEventListener('click', headerSort));
window.addEventListener('load', () =>{
	if(!loading) return console.error('something went wrong')
	 setTimeout(loadOn, 100)
});

