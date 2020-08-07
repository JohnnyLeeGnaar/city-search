const tableBodyEl = document.querySelector('.table-body');
const tableHeaderRowEl = document.querySelector('.table-heading-row');
const tableVisibleColumnEl = document.querySelector('.table-visible-columns');

export const renderTable = (headerItems, bodyItems, sortByHandler, toggleColumnVisibilityHandler) => {
    const visibleHeaderItems = headerItems.filter(item => item.visible);
    const bodyColumnKeys = visibleHeaderItems.map(item => item.value);
    const checkboxData = headerItems.map(item => ({ name: item.value, value: item.visible}));

    renderColumnCheckboxes(tableVisibleColumnEl, checkboxData, toggleColumnVisibilityHandler);
    renderTableHeader(tableHeaderRowEl, visibleHeaderItems, sortByHandler);
    renderTableBody(tableBodyEl, bodyItems, bodyColumnKeys);
}

const renderColumnCheckboxes = (parentEl, items, onClickHandler) => {
    parentEl.innerHTML = '';
    items.forEach(item => {
        const labelEl = document.createElement('label');
        labelEl.innerText = item.name;

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';

        checkboxEl.onchange = (e) => onClickHandler(item.name, !item.value);

        if(item.value) {
            checkboxEl.checked = true;
        }

        parentEl.appendChild(checkboxEl);
        parentEl.appendChild(labelEl);
    });
}

const renderTableHeader = (parentEl, items, sortByHandler) => {
    parentEl.innerHTML = '';

    items.map(item => {
        const { name, value, order } = item;

        let th = document.createElement("th");
        th.innerText = name;
        th.classList.add("table-heading");
        th.onclick = () => sortByHandler(value, nextSortOrder(order));

        if (item.active) {
            th.classList.add('active');
        }

        if (item.order === 'asc') {
            th.classList.add('asc');
        } else if (item.order == 'desc') {
            th.classList.add('desc');
        }

        return th;
    }).forEach(th => tableHeaderRowEl.appendChild(th));
}

const renderTableBody = (parentEl, items, columnKeys) => {
    parentEl.innerHTML = '';
    parentEl.innerHTML = items.map(item => {
        let row = '<tr>';
        columnKeys.forEach(key => row += `<td>${item[key]}</td>`)
        row += '</tr>';

        return row;
    }).join("");
}

const nextSortOrder = (current) => {
	let next;

	if (current == '') {
		next = 'asc';
	} else if (current == 'asc') {
		next = 'desc';
	} else if (current == 'desc') {
		next = 'asc';
	}

	return next;
}