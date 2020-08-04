import mockData from './mock-data/cities.js';
//import api from './mock-data/api.js'
const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [...mockData.JSON.geonames];
const citiesTableList = document.querySelector('.tableCityList');
const userInput = document.querySelector('.search');
const tableRow = document.querySelector('.tableRow');
const btn_next = document.querySelector(".btn_next");
const btn_prev = document.querySelector(".btn_prev");
const pageSizeLengthOptions = document.querySelectorAll('.selectToggle');
const headers = document.querySelectorAll('tHeader');

const tableHeaderData = [
{
	name: "City name",
	value: "name",
	active: true,
	sort: 'asc'

},
{
	name: "Population",
	value: "population",
	active: false,
	sort: 'none'

},
{
	name: "County",
	value: "adminName1",
	active: false,
	sort: 'none'
}
]

let inputValue = "";

const state = {
	input: "",
	page: 1,
	displayPages: 10,
	maxPages: 10,
	sortedCities: cities
}



const renderTable = () => {

	renderTableHeader(tableHeaderData);
	paginateCitiesInTableBody(cities);
}

const renderTableHeader = (items) => {
	tableRow.innerHTML = "";
	items.map(item => {
		let th = document.createElement("th");
		th.innerText = item.name;
		th.classList.add("tHeader");
		th.onclick = () => sortBy(item.value, nextSortOrder(item.sort));

		if (item.active) th.classList.add('active');
		if (item.sort === 'asc') {
			th.classList.add('asc');
		} else if (item.sort == 'desc') {
			th.classList.add('desc');
		} 
		if(!item.active){
			th.classList.add('unsorted');
		}

		return th;
	}).forEach(th => tableRow.appendChild(th));
}

const renderTableBody = (cities) => {
	console.log(`this page is ${state.page}`)
	const renderCities = cities.map(city => {
		return `
		<tr>
		<td>${city.name}</td>
		<td>${city.population}</td>
		<td>${city.adminName1}</td>
		</tr>
		`
	}).join("")

	return citiesTableList.innerHTML = renderCities;	
}

const paginateCitiesInTableBody = (cities) => {
	state.maxPages = Math.ceil(cities.length / state.displayPages);
	const paginatedCities =  cities.slice((state.page * state.displayPages) - state.displayPages, state.page*state.displayPages )
	//console.log((state.page * state.displayPages) - state.displayPages, state.page*state.displayPages )
	renderTableBody(paginatedCities);
}

const sortBy = (itemValue, nextSort ) => {
	let sortHeaders = tableHeaderData.forEach(header => {
		if(header.value == itemValue){
			header.sort = nextSort;
			header.active = true;
		}
		else{
			header.active = false;
		}
	})
	sortCitiesinList(itemValue, nextSort);
	renderTableHeader(tableHeaderData);
	}

const nextSortOrder = (current) => {
	let next;
	
	if (current == 'none') {
		next = 'asc';
	} else if (current == 'asc') {
		next = 'desc';
	} else if (current == 'desc') {
		next = 'asc';
	}

	return next;
}

const sortCitiesinList = (itemValue, nextSort) =>{
	state.page = 1;
	const filteredCities = filterCitiesInList(state.sortedCities);
	const sortedCities = filteredCities.sort(sortCitiesHelperFunc(itemValue, nextSort));
	state.sortedCities = sortedCities;
	//console.log(itemValue, nextSort);
	paginateCitiesInTableBody(sortedCities);
}

const sortCitiesHelperFunc = (value, next) => {
		if(next === 'asc'){
	return function (a, b){

		return  value === 'population' ? a[value] < b[value] ? 1 : -1 : a[value].localeCompare(b[value]);

	}
}
	return function (a, b){
		return  value === 'population' ? a[value] > b[value] ? 1 : -1 : b[value].localeCompare(a[value]);
}}

const filterCitiesInList = (cities) => {
	const regex = new RegExp(state.input, 'i');
	const filteredCities = cities.filter(city => city.name.match(regex))
	return filteredCities;
}

const filterCityListInput = (e) => {
	 state.page = 1;
	 state.input = e.target.value;
	 const filteredCities = filterCitiesInList(cities);
	 state.sortedCities = filteredCities;
	 paginateCitiesInTableBody(state.sortedCities);
}
const filterCityListInputBind = (inputValue = "") => {
	state.input = inputValue;
}
const buttonNext = (e) => {
	if(state.page < state.maxPages){
		++state.page;
	}
	if(state.page > 1){
		btn_prev.classList.remove("hidden");
	}
	paginateCitiesInTableBody(state.sortedCities);
}

const buttonPrevious = (e) => {
	if(state.page > 0){
		--state.page;	}
	if(state.page < 2){
		btn_prev.classList.add("hidden");
	}
	paginateCitiesInTableBody(state.sortedCities);
}

const dropDownPageSizeInput = (e) => {
	state.page = 1;
	state.displayPages = e.target.value;
	paginateCitiesInTableBody(state.sortedCities);
}

window.addEventListener('load', () => {
	btn_prev.classList.add("hidden");
	userInput.addEventListener('change', filterCityListInput);
	pageSizeLengthOptions.forEach(option => option.addEventListener('change', dropDownPageSizeInput));
	btn_prev.addEventListener('click', buttonPrevious);
	btn_next.addEventListener('click', buttonNext);
	renderTable()
});
