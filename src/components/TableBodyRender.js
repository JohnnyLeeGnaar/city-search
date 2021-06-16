import React, { useMemo } from "react";

import TableRow from "./TableRow";

function TableBodyRender(props) {
  const { items } = props;

  const itemList = useMemo(() => {
    return items.map((item) => {
      return <TableRow key={item.geonameId} item={item} />;
    });
  });
  return itemList;
}
export default TableBodyRender;
