import mockData from './mock-data/cities.js';

const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const cities = [...mockData.JSON.geonames];
let loading = true;
//const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames)).then(loading = true);
const userList = document.querySelector('.city-list');
const userInput = document.querySelector('.search');
let html;
let load;


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

	console.log(city.name)
	return `
	<tr>
		 <td>${city.name}</td>
		 <td>${city.population}</td>
		 <td>${city.adminName1}</td>
	</tr>
	`
    }).sort().join("");
	userList.innerHTML = html;
	test = true;
}

window.addEventListener('load', () =>{
	if(!loading) return console.error('something went wrong')
	load = setTimeout(loadOn, 1000)
	
});
clearInterval(load);
userInput.addEventListener('change', displayPlaces);
userInput.addEventListener('keyup', displayPlaces);

/*<table>
    <thead>
        <tr>
            <th colspan="2">The table header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The table body</td>
            <td>with two columns</td>
        </tr>
    </tbody>
</table>*/