import mockData from './mock-data/cities.js';

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
const sortCities = (value, next) => {
		if(next === 'asc'){
	return function (a, b){
		return value === 'population' ? a[value] < b[value] ? 1 : -1 : a[value].localeCompare(b[value]);

	}
}
	return function (a, b){
		return value === 'population' ? a[value] > b[value] ? 1 : -1 : b[value].localeCompare(a[value]);
}}

const sortCitiesinList = (itemValue, nextSort) =>{
	state.page = 1;
	const filteredCities = filterCitiesInList(cities);
	const sortedCities = filteredCities.sort(sortCities(itemValue, nextSort));
	state.sortedCities = sortedCities;
	//console.log(itemValue, nextSort);
	paginateCitiesInTableBody(sortedCities);
}

const filterCitiesInList = (cities) => {
	const regex = new RegExp(state.input, 'i');
	const filteredCities = cities.filter(city => city.name.match(regex))
	return filteredCities;
}

const filterCityListInput = (e) => {
	 state.page = 1;
	 const regex = new RegExp(e.target.value, 'i');
	 const filteredCities = cities.filter(city => city.name.match(regex))
	 state.sortedCities = filteredCities;
	 paginateCitiesInTableBody(state.sortedCities);
}
const filterCityListInputBind = (inputValue = "") => {
	state.input = inputValue;
}
const buttonNext = (e) => {
	//console.log(state.page);
	if(state.page < state.maxPages){
		++state.page;
	}
	paginateCitiesInTableBody(state.sortedCities);
}

const buttonPrevious = (e) => {
	//console.log(state.page);
	if(state.page > 0){
		--state.page;	}
	paginateCitiesInTableBody(state.sortedCities);
}

const dropDownPageSizeInput = (e) => {
	state.page = 1;
	state.displayPages = e.target.value;
	paginateCitiesInTableBody(state.sortedCities);
}

const paginateCitiesInTableBody = (cities) => {
	state.maxPages = Math.ceil(cities.length / state.displayPages);
	const paginatedCities =  cities.slice((state.page * state.displayPages) - state.displayPages, state.page*state.displayPages )
	console.log((state.page * state.displayPages) - state.displayPages, state.page*state.displayPages )
	renderTableBody(paginatedCities);
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

const renderTable = () => {

	renderTableHeader(tableHeaderData);
	paginateCitiesInTableBody(cities);
	

}


userInput.addEventListener('change', filterCityListInput);
//userInput.addEventListener('keyup', displayPlaces);
//tableHeaders.forEach(tableHeader => tableHeader.addEventListener('click', headerSort));
pageSizeLengthOptions.forEach(option => option.addEventListener('change', dropDownPageSizeInput));
btn_prev.addEventListener('click', buttonPrevious);
btn_next.addEventListener('click', buttonNext);




window.addEventListener('load', () => {



	renderTable()



});
