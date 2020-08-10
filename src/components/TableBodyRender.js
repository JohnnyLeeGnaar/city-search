import data from "../mock_data/cities.js"
import React from 'react';

function TableBodyRender (){

    const items = data.JSON.geonames;
  
    const itemList = items.map(item => {
        return (<tr key={item.geonameId}>
                    <td>{item.name}</td>
                    <td>{item.population}</td>
                    <td>{item.adminName1}</td>
                </tr>) 
     })

     console.log(itemList)
    return itemList;

}
export default TableBodyRender;



/*     const headerRender = headers.map(header => {
          return (<th key={header.value}>{header.name}</th>) 
      })

      console.log(headerRender);

    return headerRender
}
export default TableHeaderRender;*/