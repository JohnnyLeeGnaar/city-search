import React, { useState } from "react";
import TableRowExpanded from "./TableRowExpanded";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function TableRow(props) {
  const { item } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <tr
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <td>{item.name}</td>
        <td>{numberWithCommas(item.population)}</td>
        <td>{item.adminName1}</td>
      </tr>
      {isActive && (
        <TableRowExpanded setIsActive={setIsActive} isActive={isActive} />
      )}
    </React.Fragment>
  );
}

export default TableRow;