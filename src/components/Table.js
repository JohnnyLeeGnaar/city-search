import React from 'react';
import TableHeader from './TableHeader';
import TableBodyRender from './TableBodyRender';


class Table extends React.Component {

  state = {

    headers: [{
      name: "City name",
      value: "name",
      visible: true


    },
    {
      name: "Population",
      value: "population",
      visible: true

    },
    {
      name: "County",
      value: "adminName1",
      visible: true
    }]

  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    const { headers } = this.state;
    const { orderByValue, orderByDirection, onHeaderClick, bodyItems } = this.props;

    return (
      <table className="table">
        <thead>
          <tr className="table-heading-row">
            {headers.map(header => (
              <TableHeader key={header.value} data={header} orderByValue={orderByValue} orderByDirection={orderByDirection} onClick={onHeaderClick} />
            ))}

          </tr>
        </thead>
        <tbody className="table-body">
          <TableBodyRender items={bodyItems} />
        </tbody>
      </table>
    );
  }
}

export default Table;
