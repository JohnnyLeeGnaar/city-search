

export default (newParams) => {

 //const newParamKey = [{orderByValue:'name'}, {orderByDirection: 'asc'} ,{search: ''},{pageSize: '10'}, {page: 1}];
    const urlObj = new URL(window.location.href);
    const values = {};
    //console.log(newParams)
    for(let prop in newParams) {
        const value = urlObj.searchParams.get(prop) ;
        console.log(prop + " " + newParams[prop]);
        if (value) {
            values[prop] = value;
        }
        else{
            values[prop] =  newParams[prop]
        }
    };
    console.log(values);
    return values;
}