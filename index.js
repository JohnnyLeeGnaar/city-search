import mockApi from './mock-data/api.js';
import { parseUrlQueryParams, updateUrlQueryParams } from './src/url-query.js';
import { renderTable } from './src/table.js';
import renderPagination from './src/pagination.js';

//import api from './mock-data/api.js'
const link = "http://api.geonames.org/searchJSON?username=joedoe92&country=hr&maxRows=1000&style=LONG&lang=hr&type=json&cities=cities5000";
const searchInputEl = document.querySelector('.search');
const pageSizeDropdownEl = document.querySelector('.page-size-dropdown');

/*
	App flow:
	1. Parse URL query params
	2. Update internal state with parsed query params data
	3. Render initial UI and bind handlers
	4. Fetch data from API according to internal state
	5. Update UI with API response data
	6. Wait for user input
	7. Repeat 5
*/

const allowedQueryParams = ['search', 'page', 'pageSize', 'order', 'sortBy'];

let tableHeaderData = [
	{
		name: "City name",
		value: "name",
		visible: true,
		active: true,
		order: 'asc'

	},
	{
		name: "Population",
		value: "population",
		visible: true,
		active: false,
		order: ''

	},
	{
		name: "County",
		value: "adminName1",
		visible: true,
		active: false,
		order: ''
	}
]

const updateTableHeaderData = (value, order) => {
	return tableHeaderData.map(item => {
		if (item.value === value) {
			item.active = true;
			item.order = order;
		} else {
			item.active = false;
			item.order = '';
		}

		return item;
	});
};

let state = {
	search: '',
	page: 1,
	pageSize: 10,
	order: 'asc',
	sortBy: 'name'
}

const setPage = (page) => {
	state.page = page;

	fetchAndRenderData();
}

const sortBy = (value, order) => {
	tableHeaderData = updateTableHeaderData(value, order);

	state.page = 1;
	state.order = order;
	state.sortBy = value;

	fetchAndRenderData();
}

const searchBy = value => {
	state.search = value;
	state.page = 1;

	fetchAndRenderData();
}

const setPageSize = value => {
	state.pageSize = value;
	state.page = 1;

	fetchAndRenderData();
}

const toggleColumnVisibility = (value, visible) => {
	console.log(value, visible);
	tableHeaderData.forEach(item => {
		if (item.value === value) {
			item.visible = visible;
		}
	});

	fetchAndRenderData();
}

const fetchApiData = () => {
	const { search, page, pageSize, order, sortBy } = state;
	return mockApi(search, page, pageSize, sortBy, order);
}

const fetchAndRenderData = () => {
	const { page } = state;

	fetchApiData()
		.then(({ data, metadata }) => {
			renderTable(tableHeaderData, data, sortBy, toggleColumnVisibility);
			renderPagination(page, metadata.pages, setPage);
			updateUrlQueryParams(state);
		})
}

const attachEventListeners = () => {
	searchInputEl.addEventListener('change', e => searchBy(e.target.value));
	pageSizeDropdownEl.addEventListener('change', e => setPageSize(e.target.value));
}

window.addEventListener('load', () => {
	const queryValues = parseUrlQueryParams(allowedQueryParams);
	state = { ...state, ...queryValues };

	if (queryValues.sortBy || queryValues.order) {
		tableHeaderData = updateTableHeaderData(queryValues.sortBy, queryValues.order);
	}

	if (queryValues.search) {
		searchInputEl.value = queryValues.search;
	}

	attachEventListeners();
	fetchAndRenderData();
});
