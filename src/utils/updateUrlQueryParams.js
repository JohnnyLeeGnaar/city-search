
export default (newParams) => {

    let url = new URL(window.location.href);

    for (let param in newParams) {
        url.searchParams.set(param, newParams[param]);
    }
    window.history.replaceState({}, '', url);

    return null;
}