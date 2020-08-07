export const updateUrlQueryParams = (newParams) => {
    let url = new URL(window.location);

    for (let param in newParams) {
        url.searchParams.set(param, newParams[param]);
    }

    history.replaceState({}, '', url);
}

export const parseUrlQueryParams = (whitelist) => {
    const urlObj = new URL(window.location);
    const values = {};

    whitelist.forEach(param => {
        const value = urlObj.searchParams.get(param);

        if (value) {
            values[param] = value;
        }
    });

    return values;
}