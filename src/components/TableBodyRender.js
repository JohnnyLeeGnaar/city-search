
import React from 'react';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function TableBodyRender(props) {
    const { items } = props;

    const itemList = items.map((item, index) => {
        return (<tr key={index}>
            <td>{item.name}</td>
            <td>{numberWithCommas(item.population)}</td>
            <td>{item.adminName1}</td>
        </tr>)
    })
    return itemList;

}
export default TableBodyRender;

