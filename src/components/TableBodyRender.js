import React from "react";

import TableRow from "./TableRow";

function TableBodyRender(props) {
  const { items } = props;

  const itemList = items.map((item) => {
    return <TableRow key={item.geonameId} item={item} />;
  });
  return itemList;
}
export default TableBodyRender;
