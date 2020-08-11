import React from 'react';

export default ({ data, order, orderKey, onClick }) => {
  const isActive = data.value === orderKey;

  return (
    <th
      onClick={() => onClick(data.value)}
      className={`table-heading ${isActive ? 'active': ''}`}>
      {data.name}
    </th>
  )
};