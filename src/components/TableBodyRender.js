
import React from 'react';

function TableBodyRender (props){
    const { items } = props;
  
    const itemList = items.map((item, index) => {
        return (<tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.population}</td>
                    <td>{item.adminName1}</td>
                </tr>) 
     })
    return itemList;

}
export default TableBodyRender;

