

export default () => {
    const newParam = ['orderByValue', 'orderByDirection', 'search', 'pageSize', 'page'];
    const urlObj = new URL(window.location.href);
    const values = {};

    newParam.forEach(param => {
        const value = urlObj.searchParams.get(param);

        if (value) {
            values[param] = value;
        }
        else{
            values[param] = "";
        }
    });
    return values;
}
