import api from './mock-data/api.js';

//const data = fetch(link).then(blob => blob.json()).then(data => cities.push(...data.geonames)).then(loading = true);
const tableBodyEl = document.querySelector('.city-table-body');
const searchEl = document.querySelector('.search');
const nextPageEl = document.querySelector(".btn_next");
const prevPageEl = document.querySelector(".btn_prev");
const pageSizeEl = document.querySelector('.page-size');
const tablePaginationEl = document.querySelector('.table-pagination');
const tableHeaderRowEl = document.querySelector('.city-table-header-row');

let state = {
	page: 1,
	pages: null,
	pageSize: 10,
	sortBy: 'name',
	sortOrder: 'asc',
	query: ''
};

let headingItems = [
	{
		name: 'City name',
		value: 'name',
		active: true,
		sort: 'asc'
	},
	{
		name: 'Population',
		value: 'population',
		active: false,
		sort: 'none'
	},
	{
		name: 'County',
		value: 'adminName1',
		active: false,
		sort: 'none'
	}
]

const getResults = () => {
	const { query, page, pageSize, sortBy, sortOrder } = state;

	const { data, metadata: { pages } } = api(query, page, pageSize, sortBy, sortOrder);

	state.pages = pages;

	renderTable(data);
}

const renderTable = (bodyItems) => {
	const { page, pages } = state;
	renderTableHeadings(tableHeaderRowEl, headingItems);
	renderTableBody(bodyItems);
	renderTablePagination(tablePaginationEl, page, pages);
}

const renderTableHeadings = (parentEl, items) => {
	parentEl.innerHTML = '';
	items.map(item => {
		const el = document.createElement('th');
		el.classList.add('city-table-header-column');
		el.innerText = item.name;
		el.onclick = () => sortBy(item.value, nextSortOrder(item.sort));

		if (item.active) el.classList.add('active');
		if (item.sort === 'asc') {
			el.classList.add('asc');
		} else if (item.sort == 'desc') {
			el.classList.add('desc');
		} else {
			el.classList.add('asc', 'desc');
		}

		return el;
	}).forEach(el => parentEl.appendChild(el));
}

const renderTableBody = (items) => {
	tableBodyEl.innerHTML = '';

	tableBodyEl.innerHTML = items.map(item => {
		return `
			<tr>
				<td>${item.name}</td>
				<td>${item.population}</td>
				<td>${item.adminName1}</td>
			</tr>
		`;
	}).join('');
}

const renderTablePagination = (parentEl, page, pages) => {
	const prevButtonEl = document.createElement('button');
	const nextButtonEl = document.createElement('button');
	const pageNumbers = [];

	for(let i = 1; i <= pages; i++) {
		const el = document.createElement('div');

		if(page == i) {
			el.innerHTML = `<b>${i}</b>`;
		} else {
			el.innerHTML = i;
			el.onclick = () => showPage(i);
		}

		el.classList.add('pagination-page');

		pageNumbers.push(el);
	}

	prevButtonEl.classList.add('btn_prev');
	prevButtonEl.innerText = 'Previous';

	nextButtonEl.classList.add('btn_next');
	nextButtonEl.innerText = 'Next';

	if (page == 1) {
		prevButtonEl.setAttribute('disabled', true);
	} else {
		prevButtonEl.onclick = () => showPage(page - 1);
	}

	if (page == pages) {
		nextButtonEl.setAttribute('disabled', true);
	} else {
		nextButtonEl.onclick = () => showPage(page + 1);
	}

	parentEl.innerHTML = '';

	parentEl.appendChild(prevButtonEl);
	pageNumbers.forEach(number => parentEl.appendChild(number));
	parentEl.appendChild(nextButtonEl);
}

const nextSortOrder = (current) => {
	let next;
	console.log(current)
	if (current == 'none') {
		next = 'asc';
	} else if (current == 'asc') {
		next = 'desc';
	} else if (current == 'desc') {
		next = 'asc';
	}

	return next;
}

const findBy = event => {
	const value = event.target.value || '';

	state.page = 1;
	state.query = value;

	getResults();
}

const sortBy = (name, order) => {
	state.page = 1;
	state.sortOrder = order;
	state.sortBy = name;

	headingItems.forEach(item => {
		if (item.value === name) {
			item.active = true;
			item.sort = order;
		} else {
			item.active = false;
			item.sort = 'none';
		}
	})

	getResults();
};

const setPageSize = event => {
	state.pageSize = parseInt(event.target.value);
	state.page = 1;
	getResults();
}

const showPage = page => {
	console.log(page);
	state.page = page;
	getResults();
}

window.addEventListener('load', () => {
	pageSizeEl.addEventListener('change', setPageSize);
	searchEl.addEventListener('change', findBy);

	getResults();
});

