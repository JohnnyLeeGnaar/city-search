import mockData from './mock-data/cities.js';

const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [...mockData.JSON.geonames];
let filteredCities = cities;
let indexedCities;
let loading = true;
//const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames)).then(loading = true);
const userList = document.querySelector('.city-list');
const userInput = document.querySelector('.search');
const tableHeaders = document.querySelectorAll('[data-val]');
const btn_next = document.querySelector(".btn_next");
const btn_prev = document.querySelector(".btn_prev");
const option = document.querySelector('.option__');
let html;
let changeDirection = false;
let optionValue = 0;
let lastButton;
let pageCount = 0;
let increment = 0;
let sum = 0;
let maxPages = 1;
let pages = 0;



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
	this.innerText = this.dataset.name + icon;
	changeDirection = !changeDirection;
	this.classList.remove('active');
}


function paginate(e){

	sum = pageCount;
	increment = parseInt(this.dataset.option);

	if(Math.sign(increment) > 0)
	  {
	  	pages++;
	  }
	else{
		pages--;
	}

	 
	maxPages = Math.round(cities.length/this.dataset.option);
	console.log(`pages ${pages} out of max pages: ${maxPages}`);
	sum = increment < 0 ? sum+increment : sum;
	pageCount += increment;
	if(pageCount > cities.length){
		this.classList.add('hidden');
	}
	let indexed = increment > 0 ? cities.slice(sum, pageCount) : cities.slice(sum+increment, sum)
	console.log(sum, pageCount, cities.length)
	//indexedCities = mapCities(indexedCities);
	html = mapCities(indexed);
	userList.innerHTML = html;


	  if (pages == 0) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (pages == maxPages) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }

}

userInput.addEventListener('change', displayPlaces);
userInput.addEventListener('keyup', displayPlaces);
tableHeaders.forEach(tableHeader => tableHeader.addEventListener('click', headerSort));
btn_prev.addEventListener('click', paginate);
btn_next.addEventListener('click', paginate);
//option.addEventListener('change', (e) => {console.log(e)});

window.addEventListener('load', () =>{
	if(!loading) return console.error('something went wrong')
	 setTimeout(loadOn, 100)
});

