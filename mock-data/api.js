import data from './cities.js';

const cities = data.JSON.geonames;

const sortItems = (items, sortBy, sortOrder) => {
    let sortedItems = items.sort(function (a, b) {
        if (typeof items[sortBy] === 'string') {
            return a[sortBy].localeCompare(b[sortBy]);
        } else {
            return a[sortBy] > b[sortBy];
        }

    });

    if (sortOrder === 'desc') {
        sortedItems = sortedItems.reverse();
    }

    return sortedItems;
}

const getPageItems = (items, page, pageSize) => {
    return items.slice((page * pageSize) - pageSize, page * pageSize);
}

const getQueryResults = query => query ? cities.filter(city => city.name.toLowerCase().includes(query)) : cities;

export default (query, page, pageSize, sortBy, sortOrder) => {
    const queryItems = getQueryResults(query);

    const sortedItems = sortItems(queryItems, sortBy, sortOrder);

    const pageItems = getPageItems(sortedItems, page, pageSize);

    const maxPages = Math.ceil(queryItems.length / pageSize);

    return Promise.resolve({
        data: pageItems,
        metadata: {
            pages: maxPages
        }
    });
}
