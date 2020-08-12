import data from "../mock_data/cities.js"
import React from 'react';

function TableBodyRender (props){

    const { orderByValue, orderByDirection } = props;
    const items = data.JSON.geonames;
    const sortedItems = sortItems(items, orderByValue, orderByDirection);
    console.log(typeof(orderByValue));
  
    const itemList = sortedItems.map(item => {
        return (<tr key={item.geonameId}>
                    <td>{item.name}</td>
                    <td>{item.population}</td>
                    <td>{item.adminName1}</td>
                </tr>) 
     })

     //console.log(itemList)
    return itemList;

}
const sortItems = (items, sortBy, sortOrder) => {
    let sortedItems = items.sort(function (a, b) {
        if(sortBy !== 'population'){
            return a[sortBy].localeCompare(b[sortBy]);

        }else{
            return a[sortBy] > b[sortBy];
        }
        
    });
    
    if (sortOrder === 'desc') {
        sortedItems = sortedItems.reverse();
        
    }
   

    return sortedItems;
}


export default TableBodyRender;


/*const sortItems = (items, sortBy, sortOrder) => {
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
}     */