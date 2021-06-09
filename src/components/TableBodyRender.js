import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import TableRow from "./TableRow";

function TableBodyRender(props) {
  const { items } = props;

  const itemList = items.map((item) => {
    return <TableRow key={item.geonameId} item={item} />;
  });
  return itemList;
}
export default TableBodyRender;
