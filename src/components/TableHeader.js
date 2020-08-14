import React from 'react';

function TableHeader(props) {
  const { orderByValue, orderByDirection, onClick, data } = props;
  const isActive = data.value === orderByValue ? true : false;
  let direction = '';

  if (isActive) {
    direction = orderByDirection;
  }
  return (<th
    onClick={() => onClick(data.value)}
    className={`table-heading ${isActive ? 'active' : ''} ${direction}`}>
    {data.name}
  </th>
  )
}
export default TableHeader;
